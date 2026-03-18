import { Controller, Get, Query, Res } from '@nestjs/common';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import * as express from 'express';
import { ReportsService } from './reports.service';
import { ReportQueryDto } from './dto/report-query.dto';
import {
  ExportBorrowingsQueryDto,
  ExportOverdueQueryDto,
} from './dto/export-query.dto';
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Parser } = require('json2csv');
import * as ExcelJS from 'exceljs';
import { Borrowing } from '../borrowing/entities/borrowing.entity';
import {
  ApiGetBorrowingReport,
  ApiExportBorrowings,
  ApiExportOverdue,
} from './reports.swagger';

@ApiTags('Reports')
@ApiBasicAuth()
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('borrowings')
  @ApiGetBorrowingReport()
  getBorrowingReport(@Query() query: ReportQueryDto) {
    return this.reportsService.getBorrowingReport(query.from, query.to);
  }

  @Get('borrowings/export')
  @ApiExportBorrowings()
  async exportBorrowings(
    @Query() query: ExportBorrowingsQueryDto,
    @Res() res: express.Response,
  ) {
    const borrowings = await this.reportsService.getBorrowingsForExport(
      query.from,
      query.to,
    );
    const rows = this.flattenBorrowings(borrowings);

    if (query.format === 'xlsx') {
      return this.sendXlsx(res, rows, 'borrowings-report');
    }

    return this.sendCsv(res, rows, 'borrowings-report');
  }

  @Get('overdue/export')
  @ApiExportOverdue()
  async exportOverdue(
    @Query() query: ExportOverdueQueryDto,
    @Res() res: express.Response,
  ) {
    const borrowings = await this.reportsService.getOverdueForExport();
    const rows = this.flattenBorrowings(borrowings);

    if (query.format === 'xlsx') {
      return this.sendXlsx(res, rows, 'overdue-report');
    }

    return this.sendCsv(res, rows, 'overdue-report');
  }

  private flattenBorrowings(borrowings: Borrowing[]) {
    return borrowings.map((b) => ({
      borrowingId: b.id,
      bookTitle: b.book?.title ?? '',
      bookIsbn: b.book?.isbn ?? '',
      borrowerName: b.borrower?.name ?? '',
      borrowerEmail: b.borrower?.email ?? '',
      checkoutDate: b.checkoutDate?.toISOString() ?? '',
      dueDate: b.dueDate?.toISOString() ?? '',
      returnDate: b.returnDate?.toISOString() ?? '',
    }));
  }

  private sendCsv(
    res: express.Response,
    rows: Record<string, unknown>[],
    filename: string,
  ) {
    const parser = new Parser();
    const csv = rows.length > 0 ? parser.parse(rows) : '';

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}.csv`,
    );
    res.send(csv);
  }

  private async sendXlsx(
    res: express.Response,
    rows: Record<string, unknown>[],
    filename: string,
  ) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Report');

    if (rows.length > 0) {
      worksheet.columns = Object.keys(rows[0]).map((key) => ({
        header: key,
        key,
        width: 20,
      }));
      rows.forEach((row) => worksheet.addRow(row));
    }

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}.xlsx`,
    );

    await workbook.xlsx.write(res);
    res.end();
  }
}
