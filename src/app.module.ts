import { Module } from '@nestjs/common';
import { UrlshortenerController } from './controllers/urlshortener.controller';
import { UrlshortenerService } from './services/urlshortener.service';
import { RedisrepositoryService } from './services/redisRepository.service';
import { ConfigModule } from '@nestjs/config';

// Open API hinzufügen https://docs.nestjs.com/openapi/introduction
@Module ({
  imports: [ConfigModule.forRoot()],
 
  controllers: [UrlshortenerController],
 
  providers: [UrlshortenerService, RedisrepositoryService]
})

export class AppModule {}
