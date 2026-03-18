import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BorrowingReportResponseDto } from './dto/borrowing-report-response.dto';

export function ApiGetBorrowingReport() {
  return applyDecorators(
    ApiOperation({ summary: 'Get borrowing report for a date range' }),
    ApiResponse({ status: 200, description: 'Borrowing report data', type: BorrowingReportResponseDto }),
  );
}

export function ApiExportBorrowings() {
  return applyDecorators(
    ApiOperation({ summary: 'Export borrowing report as CSV or XLSX' }),
    ApiResponse({ status: 200, description: 'File download' }),
  );
}

export function ApiExportOverdue() {
  return applyDecorators(
    ApiOperation({ summary: 'Export overdue borrowings as CSV or XLSX' }),
    ApiResponse({ status: 200, description: 'File download' }),
  );
}
