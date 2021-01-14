import { Test, TestingModule } from '@nestjs/testing';
import { UrlshortenerController } from './urlshortener.controller';
import { RedisRepositoryService } from 'src/services/redisRepository.service';

describe('UrlshortenerController', () => {
  let urlShortenerController: UrlshortenerController;
  let redisRepositoryService: RedisRepositoryService;

  beforeEach(async () => {
    redisRepositoryService = new RedisRepositoryService();
    urlShortenerController = new UrlshortenerController(RedisRepositoryService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(redisRepositoryService, 'findAll').mockImplementation(() => result);

      expect(await urlShortenerController.findAll()).toBe(result)
    })
  })
  });
