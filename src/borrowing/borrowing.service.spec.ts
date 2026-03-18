import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingService } from './borrowing.service';
import { BorrowingRepository } from './borrowing.repository';

describe('BorrowingService', () => {
  let service: BorrowingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BorrowingService,
        {
          provide: BorrowingRepository,
          useValue: {
            checkout: jest.fn(),
            returnBook: jest.fn(),
            findBorrowerBorrowings: jest.fn(),
            findOverdue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BorrowingService>(BorrowingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
