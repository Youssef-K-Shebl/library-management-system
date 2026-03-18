import { ApiProperty } from '@nestjs/swagger';
import { Borrowing } from '../../borrowing/entities/borrowing.entity';

class ReportPeriodDto {
  @ApiProperty({ example: '2024-01-01' })
  from: string;

  @ApiProperty({ example: '2024-12-31' })
  to: string;
}

export class BorrowingReportResponseDto {
  @ApiProperty({ type: ReportPeriodDto })
  period: ReportPeriodDto;

  @ApiProperty({ example: 42 })
  totalBorrowings: number;

  @ApiProperty({ example: 35 })
  returned: number;

  @ApiProperty({ example: 7 })
  stillBorrowed: number;

  @ApiProperty({ example: 3 })
  overdue: number;

  @ApiProperty({ type: [Borrowing] })
  borrowings: Borrowing[];
}
