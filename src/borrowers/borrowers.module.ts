import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowersService } from './borrowers.service';
import { BorrowersController } from './borrowers.controller';
import { BorrowersRepository } from './borrowers.repository';
import { Borrower } from './entities/borrower.entity';
import { BorrowingModule } from '../borrowing/borrowing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Borrower]),
    forwardRef(() => BorrowingModule),
  ],
  controllers: [BorrowersController],
  providers: [BorrowersRepository, BorrowersService],
  exports: [BorrowersService],
})
export class BorrowersModule {}
