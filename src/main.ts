/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './openAPI/swagger';
import { join } from 'path';
import { Logger } from '@nestjs/common'

async function bootstrap() 
{
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const port = process.env.PORT || 3000;

  app.useStaticAssets(join(__dirname, '..', '/src/assets/css'));
  app.setBaseViewsDir(join(__dirname, '..', '/src/views'));
  app.setViewEngine('hbs');
  
  // app.setGlobalPrefix('api/v1');

  SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(port);

  Logger.log(`Server is running on http://localhost:${port}`, 'Bootstrap');
}

bootstrap();