import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(private readonly booksRepository: BooksRepository) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const existing = await this.booksRepository.findByIsbn(createBookDto.isbn);
    if (existing) {
      throw new ConflictException('A book with this ISBN already exists');
    }
    return this.booksRepository.create(createBookDto);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  search(query: string): Promise<Book[]> {
    return this.booksRepository.search(query);
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    if (updateBookDto.isbn) {
      const existing = await this.booksRepository.findByIsbn(
        updateBookDto.isbn,
      );
      if (existing && existing.id !== id) {
        throw new ConflictException('A book with this ISBN already exists');
      }
    }
    const book = await this.booksRepository.update(id, updateBookDto);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async remove(id: string): Promise<Book> {
    const book = await this.booksRepository.remove(id);
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }
}
