import { Test, TestingModule } from '@nestjs/testing';
import { BorrowersService } from './borrowers.service';
import { BorrowersRepository } from './borrowers.repository';

describe('BorrowersService', () => {
  let service: BorrowersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      ],
    }).compile();

    service = module.get<BorrowersService>(BorrowersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
