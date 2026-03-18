import { Test, TestingModule } from '@nestjs/testing';
import { BorrowingController } from './borrowing.controller';
import { BorrowingService } from './borrowing.service';

describe('BorrowingController', () => {
  let controller: BorrowingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BorrowingController],
      providers: [
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

    controller = module.get<BorrowingController>(BorrowingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
