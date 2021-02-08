import { Test, TestingModule } from '@nestjs/testing';
import { RedisRepositoryService } from './redisRepository.service';
import ConfigService from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';
import { UrlshortenerController } from 'src/controllers/urlshortener.controller';
import { UrlShortenerService } from './urlshortener.service';
import { InjectRedisClient } from '../decorators';
import * as Redis from 'ioredis';

const app: TestingModule = await Test.createTestingModule({
  imports: [
    RedisRepositoryService.register({
      host: 'localhost',
      port: 6379,
    })
  ],
  controllers: [UrlshortenerController],
  providers: [UrlShortenerService],
}).compile();

describe('storage/redis', () => 
{
  let service: RedisRepositoryService;

  beforeEach(async () => 
  {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisRepositoryService],
    }).compile();

    service = module.get<RedisRepositoryService>(RedisRepositoryService);
  });

  it('should set shortURL', () => 
  {
    expect(service.set).toBeDefined();
  });


  it('should get longURL', () => 
  {
    expect(service.get).toBeDefined();
  });


  it('should delete shortURL', () => 
  {
    expect(service.del).toBeDefined();
  });

});
