import { Test, TestingModule } from '@nestjs/testing';
import { LaucherController } from './laucher.controller';
import { LaunchesService } from './laucher.service';

describe('LaucherController', () => {
  let controller: LaucherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaucherController],
      providers: [LaunchesService],
    }).compile();

    controller = module.get<LaucherController>(LaucherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
