import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowingService } from './borrowing.service';
import { BorrowingController } from './borrowing.controller';
import { BorrowingRepository } from './borrowing.repository';
import { Borrowing } from './entities/borrowing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing])],
  controllers: [BorrowingController],
  providers: [BorrowingRepository, BorrowingService],
  exports: [BorrowingService],
})
export class BorrowingModule {}
