import { Module, HttpModule } from '@nestjs/common';
import { UrlshortenerController } from './controllers/urlshortener.controller';
import { UrlShortenerService } from './services/urlshortener.service';
import { RedisRepositoryService } from './services/redisRepository.service';
import { ConfigModule } from '@nestjs/config';
// import { AppController } from './controllers/app.controller';
import { RedirectControllerController } from './controllers/redirect-controller/redirect-controller.controller';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],

  controllers: [UrlshortenerController, RedirectControllerController],

  providers: [UrlShortenerService, RedisRepositoryService],
})
export class AppModule {}
