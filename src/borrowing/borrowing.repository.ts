import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, IsNull, Repository } from 'typeorm';
import { Borrowing } from './entities/borrowing.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class BorrowingRepository {
  constructor(
    @InjectRepository(Borrowing)
    private readonly repo: Repository<Borrowing>,
    private readonly dataSource: DataSource,
  ) {}

  async checkout(bookId: string, borrowerId: string): Promise<Borrowing> {
    return this.dataSource.transaction(async (manager) => {
      const book = await manager.findOneBy(Book, { id: bookId });
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      if (book.availableQuantity <= 0) {
        throw new BadRequestException(
          `Book "${book.title}" is not available for checkout`,
        );
      }

      const activeBorrowing = await manager.findOne(Borrowing, {
        where: { bookId, borrowerId, returnDate: IsNull() },
      });
      if (activeBorrowing) {
        throw new BadRequestException(
          'This borrower already has an active borrowing for this book',
        );
      }

      book.availableQuantity -= 1;
      await manager.save(Book, book);

      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);

      const borrowing = manager.create(Borrowing, {
        bookId,
        borrowerId,
        dueDate,
      });

      return manager.save(Borrowing, borrowing);
    });
  }

  async returnBook(bookId: string, borrowerId: string): Promise<Borrowing> {
    return this.dataSource.transaction(async (manager) => {
      const borrowing = await manager.findOne(Borrowing, {
        where: {
          bookId,
          borrowerId,
          returnDate: IsNull(),
        },
      });

      if (!borrowing) {
        throw new NotFoundException(
          'No active borrowing found for this book and borrower',
        );
      }

      borrowing.returnDate = new Date();
      await manager.save(Borrowing, borrowing);

      const book = await manager.findOneBy(Book, { id: bookId });
      if (book) {
        book.availableQuantity += 1;
        await manager.save(Book, book);
      }

      return borrowing;
    });
  }

  async findBorrowerBorrowings(borrowerId: string): Promise<Borrowing[]> {
    return this.repo.find({
      where: { borrowerId, returnDate: IsNull() },
      relations: ['book'],
    });
  }

  async findOverdue(): Promise<Borrowing[]> {
    return this.repo
      .createQueryBuilder('borrowing')
      .leftJoinAndSelect('borrowing.book', 'book')
      .leftJoinAndSelect('borrowing.borrower', 'borrower')
      .where('borrowing.due_date < NOW()')
      .andWhere('borrowing.return_date IS NULL')
      .getMany();
  }
}
