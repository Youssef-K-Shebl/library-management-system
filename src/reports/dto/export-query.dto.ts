import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsIn, IsOptional } from 'class-validator';

export class ExportBorrowingsQueryDto {
  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  from: string;

  @ApiProperty({ example: '2024-12-31' })
  @IsDateString()
  to: string;

  @ApiPropertyOptional({ example: 'csv', enum: ['csv', 'xlsx'], default: 'csv' })
  @IsOptional()
  @IsIn(['csv', 'xlsx'])
  format?: string = 'csv';
}

export class ExportOverdueQueryDto {
  @ApiPropertyOptional({ example: 'csv', enum: ['csv', 'xlsx'], default: 'csv' })
  @IsOptional()
  @IsIn(['csv', 'xlsx'])
  format?: string = 'csv';
}
