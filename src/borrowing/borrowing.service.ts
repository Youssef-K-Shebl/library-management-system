import { Injectable } from '@nestjs/common';
import { BorrowingRepository } from './borrowing.repository';
import { CheckoutDto } from './dto/checkout.dto';
import { ReturnDto } from './dto/return.dto';
import { Borrowing } from './entities/borrowing.entity';

@Injectable()
export class BorrowingService {
  constructor(private readonly borrowingRepository: BorrowingRepository) {}

  checkout(checkoutDto: CheckoutDto): Promise<Borrowing> {
    return this.borrowingRepository.checkout(
      checkoutDto.bookId,
      checkoutDto.borrowerId,
    );
  }

  returnBook(returnDto: ReturnDto): Promise<Borrowing> {
    return this.borrowingRepository.returnBook(
      returnDto.bookId,
      returnDto.borrowerId,
    );
  }

  getBorrowerBorrowings(borrowerId: string): Promise<Borrowing[]> {
    return this.borrowingRepository.findBorrowerBorrowings(borrowerId);
  }

  getOverdue(): Promise<Borrowing[]> {
    return this.borrowingRepository.findOverdue();
  }
}
