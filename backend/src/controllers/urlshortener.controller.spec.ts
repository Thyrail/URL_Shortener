import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenerController } from './urlshortener.controller';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { Req } from '@nestjs/common';

describe('UrlshortenerController', () => {
  let urlShortenerController: UrlshortenerController;
  let redisRepositoryService: RedisRepositoryService;

  beforeEach(async () => {
    redisRepositoryService = new RedisRepositoryService();
    urlShortenerController = new UrlshortenerController(RedisRepositoryService);
  });

  describe('Post', () => {
    it('longURL kürzen und shortURL-ID zurückgeben', async () => {
      const result = ['test'];
      jest.spyOn(redisRepositoryService, 'set').mockImplementation(() => result);

      expect(await urlShortenerController.saveLongUrl()).toBe(result)
    })
  })
  });
