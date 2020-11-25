import { Module } from '@nestjs/common';
import { UrlshortenerController } from './controllers/urlshortener.controller';
import { UrlShortenerService } from './services/urlshortener.service';
import { RedisRepositoryService } from './services/redisRepository.service';
import { ConfigModule } from '@nestjs/config';

@Module ({
  imports: [ConfigModule.forRoot()],

  controllers: [UrlshortenerController],

  providers: [UrlShortenerService, RedisRepositoryService]
})

export class AppModule {}
