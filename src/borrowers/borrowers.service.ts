import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { BorrowersRepository } from './borrowers.repository';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { Borrower } from './entities/borrower.entity';

@Injectable()
export class BorrowersService {
  constructor(private readonly borrowersRepository: BorrowersRepository) {}

  async create(createBorrowerDto: CreateBorrowerDto): Promise<Borrower> {
    const existing = await this.borrowersRepository.findByEmail(
      createBorrowerDto.email,
    );
    if (existing) {
      throw new ConflictException('A borrower with this email already exists');
    }
    return this.borrowersRepository.create(createBorrowerDto);
  }

  findAll(): Promise<Borrower[]> {
    return this.borrowersRepository.findAll();
  }

  async findOne(id: string): Promise<Borrower> {
    const borrower = await this.borrowersRepository.findOne(id);
    if (!borrower)
      throw new NotFoundException('Borrower not found');
    return borrower;
  }

  async update(
    id: string,
    updateBorrowerDto: UpdateBorrowerDto,
  ): Promise<Borrower> {
    if (updateBorrowerDto.email) {
      const existing = await this.borrowersRepository.findByEmail(
        updateBorrowerDto.email,
      );
      if (existing && existing.id !== id) {
        throw new ConflictException(
          'A borrower with this email already exists',
        );
      }
    }
    const borrower = await this.borrowersRepository.update(
      id,
      updateBorrowerDto,
    );
    if (!borrower)
      throw new NotFoundException('Borrower not found');
    return borrower;
  }

  async remove(id: string): Promise<Borrower> {
    const borrower = await this.borrowersRepository.remove(id);
    if (!borrower)
      throw new NotFoundException('Borrower not found');
    return borrower;
  }
}
