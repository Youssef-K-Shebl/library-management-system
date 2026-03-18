import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Borrowing } from '../../borrowing/entities/borrowing.entity';

@Entity('borrowers')
export class Borrower {
  @ApiProperty({ example: '6ba7b810-9dad-11d1-80b4-00c04fd430c8' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'John Doe' })
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Index()
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({ example: '2024-01-15T10:30:00.000Z' })
  @CreateDateColumn({ name: 'registered_date' })
  registeredDate: Date;

  @OneToMany(() => Borrowing, (borrowing) => borrowing.borrower)
  borrowings: Borrowing[];
}
