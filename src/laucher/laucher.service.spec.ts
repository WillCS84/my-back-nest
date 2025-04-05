import { Test, TestingModule } from '@nestjs/testing';
import { LaucherService } from './laucher.service';

describe('LaucherService', () => {
  let service: LaucherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LaucherService],
    }).compile();

    service = module.get<LaucherService>(LaucherService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
