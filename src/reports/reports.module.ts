import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { Borrowing } from '../borrowing/entities/borrowing.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Borrowing])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
