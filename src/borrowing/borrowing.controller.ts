import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { BorrowingService } from './borrowing.service';
import { CheckoutDto } from './dto/checkout.dto';
import { ReturnDto } from './dto/return.dto';
import { ApiCheckout, ApiReturn, ApiGetOverdue } from './borrowing.swagger';

@ApiTags('Borrowings')
@ApiBasicAuth()
@Controller('borrowings')
export class BorrowingController {
  constructor(private readonly borrowingService: BorrowingService) {}

  @Post('checkout')
  @ApiCheckout()
  checkout(@Body() checkoutDto: CheckoutDto) {
    return this.borrowingService.checkout(checkoutDto);
  }

  @Post('return')
  @ApiReturn()
  returnBook(@Body() returnDto: ReturnDto) {
    return this.borrowingService.returnBook(returnDto);
  }

  @Get('overdue')
  @ApiGetOverdue()
  getOverdue() {
    return this.borrowingService.getOverdue();
  }
}
