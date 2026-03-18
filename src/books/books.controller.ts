import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiBasicAuth } from '@nestjs/swagger';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  ApiCreateBook,
  ApiFindAllBooks,
  ApiSearchBooks,
  ApiFindOneBook,
  ApiUpdateBook,
  ApiDeleteBook,
} from './books.swagger';

@ApiTags('Books')
@ApiBasicAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiCreateBook()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  @ApiFindAllBooks()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('search')
  @ApiSearchBooks()
  search(@Query('query') query: string) {
    return this.booksService.search(query);
  }

  @Get(':id')
  @ApiFindOneBook()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.booksService.findOne(id);
  }

  @Put(':id')
  @ApiUpdateBook()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteBook()
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.booksService.remove(id);
  }
}
