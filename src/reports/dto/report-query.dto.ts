import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class ReportQueryDto {
  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  from: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  to: string;
}
