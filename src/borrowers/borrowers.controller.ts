import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { BorrowersService } from './borrowers.service';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { BorrowingService } from '../borrowing/borrowing.service';
import {
  ApiCreateBorrower,
  ApiFindAllBorrowers,
  ApiFindOneBorrower,
  ApiFindBorrowerBorrowings,
  ApiUpdateBorrower,
  ApiDeleteBorrower,
} from './borrowers.swagger';

@ApiTags('Borrowers')
@ApiBasicAuth()
@Controller('borrowers')
export class BorrowersController {
  constructor(
    private readonly borrowersService: BorrowersService,
    private readonly borrowingService: BorrowingService,
  ) {}

  @Post()
  @ApiCreateBorrower()
  create(@Body() createBorrowerDto: CreateBorrowerDto) {
    return this.borrowersService.create(createBorrowerDto);
  }

  @Get()
  @ApiFindAllBorrowers()
  findAll() {
    return this.borrowersService.findAll();
  }

  @Get(':id')
  @ApiFindOneBorrower()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowersService.findOne(id);
  }

  @Get(':id/borrowings')
  @ApiFindBorrowerBorrowings()
  findBorrowings(@Param('id', ParseUUIDPipe) id: string) {
    return this.borrowingService.getBorrowerBorrowings(id);
  }

  @Put(':id')
  @ApiUpdateBorrower()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBorrowerDto: UpdateBorrowerDto,
  ) {
    return this.borrowersService.update(id, updateBorrowerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteBorrower()
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.borrowersService.remove(id);
  }
}
