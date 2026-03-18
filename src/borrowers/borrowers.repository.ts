import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Borrower } from './entities/borrower.entity';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';

@Injectable()
export class BorrowersRepository {
  constructor(
    @InjectRepository(Borrower)
    private readonly repo: Repository<Borrower>,
  ) {}

  async create(data: CreateBorrowerDto): Promise<Borrower> {
    return this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Borrower[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Borrower | null> {
    return this.repo.findOneBy({ id });
  }

  async update(id: string, data: UpdateBorrowerDto): Promise<Borrower | null> {
    const borrower = await this.repo.preload({ id, ...data });
    if (!borrower) return null;
    return this.repo.save(borrower);
  }

  async findByEmail(email: string): Promise<Borrower | null> {
    return this.repo.findOneBy({ email });
  }

  async remove(id: string): Promise<Borrower | null> {
    const borrower = await this.repo.findOneBy({ id });
    if (!borrower) return null;
    return this.repo.remove(borrower);
  }
}
