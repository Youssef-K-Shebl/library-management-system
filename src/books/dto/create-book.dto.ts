import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'The Great Gatsby' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @IsString()
  @IsNotEmpty()
  author: string;

  @ApiProperty({ example: '9780743273565', minLength: 10, maxLength: 13 })
  @IsString()
  @Length(10, 13)
  isbn: string;

  @ApiProperty({ example: 5, minimum: 0 })
  @IsInt()
  @Min(0)
  availableQuantity: number;

  @ApiProperty({ example: 'A-3-14' })
  @IsString()
  @IsNotEmpty()
  shelfLocation: string;
}
