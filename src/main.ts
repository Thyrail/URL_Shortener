import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createDocument } from './swagger/swagger'

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);

  // http://localhost:3000/api/
  app.setGlobalPrefix('api');
  
  SwaggerModule.setup('api', app, createDocument(app));

  await app.listen(3000);
} 

bootstrap();
