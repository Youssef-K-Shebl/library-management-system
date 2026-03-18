import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchBooksDto {
  @ApiProperty({ example: 'Gatsby', description: 'Search by title, author, or ISBN' })
  @IsString()
  @IsNotEmpty()
  query: string;
}
