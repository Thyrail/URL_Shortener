import { CacheModule, Module } from '@nestjs/common';
import { UrlshortenerController } from './controllers/urlshortener.controller';
import { UrlshortenerService } from './services/urlshortener.service';
import { RedisrepositoryService } from './services/redisRepository.service';
import { ConfigModule } from '@nestjs/config';

// TODO: Open API hinzufügen https://docs.nestjs.com/openapi/introduction
@Module ({
  imports: [ConfigModule.forRoot(), CacheModule.register ({

    ttl: 600, // 10 Minuten im Cache zwischenspeichern, damit REDIS nicht immer neu Angefragt werden muss

  })],
 
  controllers: [UrlshortenerController],
 
  providers: [UrlshortenerService, RedisrepositoryService],
})

export class AppModule {}
