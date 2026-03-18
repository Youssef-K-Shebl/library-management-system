import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class ReturnDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  bookId: string;

  @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
  @IsUUID()
  borrowerId: string;
}
