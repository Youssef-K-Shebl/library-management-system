import { Test, TestingModule } from '@nestjs/testing';
import { BorrowersController } from './borrowers.controller';
import { BorrowersService } from './borrowers.service';
import { BorrowersRepository } from './borrowers.repository';
import { BorrowingService } from '../borrowing/borrowing.service';

describe('BorrowersController', () => {
  let controller: BorrowersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowersController],
      providers: [
        BorrowersService,
        {
          provide: BorrowersRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: BorrowingService,
          useValue: {
            checkout: jest.fn(),
            returnBook: jest.fn(),
            getBorrowerBorrowings: jest.fn(),
            getOverdue: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<BorrowersController>(BorrowersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
