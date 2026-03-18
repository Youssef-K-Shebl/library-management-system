import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Borrowing } from '../../borrowing/entities/borrowing.entity';

@Entity('books')
export class Book {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'The Great Gatsby' })
  @Index('idx_books_title_trgm')
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({ example: 'F. Scott Fitzgerald' })
  @Index('idx_books_author_trgm')
  @Column({ type: 'varchar', length: 255 })
  author: string;

  @ApiProperty({ example: '9780743273565' })
  @Index('idx_books_isbn_trgm')
  @Column({ type: 'varchar', length: 13, unique: true })
  isbn: string;

  @ApiProperty({ example: 5 })
  @Column({ name: 'available_quantity', type: 'integer', default: 0 })
  availableQuantity: number;

  @ApiProperty({ example: 'A-3-14' })
  @Column({ name: 'shelf_location', type: 'varchar', length: 100 })
  shelfLocation: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.book)
  borrowings: Borrowing[];
}
