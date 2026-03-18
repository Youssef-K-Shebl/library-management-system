import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, IsNull, LessThan, Repository } from 'typeorm';
import { Borrowing } from '../borrowing/entities/borrowing.entity';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Borrowing)
    private readonly borrowingRepo: Repository<Borrowing>,
  ) {}

  async getBorrowingReport(from: string, to: string) {
    const borrowings = await this.borrowingRepo.find({
      where: {
        checkoutDate: Between(new Date(from), new Date(to)),
      },
      relations: ['book', 'borrower'],
    });

    const totalBorrowings = borrowings.length;
    const returned = borrowings.filter((b) => b.returnDate !== null).length;
    const overdue = borrowings.filter(
      (b) => b.returnDate === null && b.dueDate < new Date(),
    ).length;

    return {
      period: { from, to },
      totalBorrowings,
      returned,
      stillBorrowed: totalBorrowings - returned,
      overdue,
      borrowings,
    };
  }

  async getBorrowingsForExport(from: string, to: string) {
    return this.borrowingRepo.find({
      where: {
        checkoutDate: Between(new Date(from), new Date(to)),
      },
      relations: ['book', 'borrower'],
    });
  }

  async getOverdueForExport() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    return this.borrowingRepo.find({
      where: {
        dueDate: LessThan(new Date()),
        returnDate: IsNull(),
        checkoutDate: Between(lastMonth, new Date()),
      },
      relations: ['book', 'borrower'],
    });
  }
}
