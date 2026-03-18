import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Book } from '../../books/entities/book.entity';
import { Borrower } from '../../borrowers/entities/borrower.entity';

@Entity('borrowings')
export class Borrowing {
  @ApiProperty({ example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: () => Book })
  @ManyToOne(() => Book, (book) => book.borrowings)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @Index()
  @Column({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @ApiProperty({ type: () => Borrower })
  @ManyToOne(() => Borrower, (borrower) => borrower.borrowings)
  @JoinColumn({ name: 'borrower_id' })
  borrower: Borrower;

  @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
  @Index()
  @Column({ name: 'borrower_id', type: 'uuid' })
  borrowerId: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  @CreateDateColumn({ name: 'checkout_date' })
  checkoutDate: Date;

  @ApiProperty({ example: '2024-01-29T10:30:00.000Z' })
  @Index()
  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @ApiPropertyOptional({ example: '2024-01-25T14:00:00.000Z', nullable: true })
  @Column({ name: 'return_date', type: 'timestamp', nullable: true })
  returnDate: Date | null;
}
