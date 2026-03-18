import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repo: Repository<Book>,
  ) {}

  async create(data: CreateBookDto): Promise<Book> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Book[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Book | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: UpdateBookDto): Promise<Book | null> {
    const book = await this.repo.preload({ id, ...data });
    if (!book) return null;
    return this.repo.save(book);
  }

  async remove(id: string): Promise<Book | null> {
    const book = await this.repo.findOneBy({ id });
    if (!book) return null;
    return this.repo.remove(book);
  }

  async findByIsbn(isbn: string): Promise<Book | null> {
    return this.repo.findOneBy({ isbn });
  }

  async search(query: string): Promise<Book[]> {
    return this.repo
      .createQueryBuilder('book')
      .where(
        'similarity(book.title, :raw) > 0.1 OR similarity(book.author, :raw) > 0.1 OR book.isbn ILIKE :pattern',
        { raw: query, pattern: `%${query}%` },
      )
      .orderBy(
        'GREATEST(similarity(book.title, :raw), similarity(book.author, :raw))',
        'DESC',
      )
      .setParameter('raw', query)
      .getMany();
  }
}
