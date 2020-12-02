import { Test, TestingModule } from '@nestjs/testing';
import { RedisrepositoryService } from './redisRepository.service';

describe('RedisrepositoryService', () => {
  let service: RedisrepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisrepositoryService],
    }).compile();

    service = module.get<RedisrepositoryService>(RedisrepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
