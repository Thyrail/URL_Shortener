import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() 
{
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  
  // http://localhost:3000/api/
  const options = new DocumentBuilder()
    .setTitle('Thyrails Test API')
    .setDescription('For TeamWork used API')
    .setVersion('1.0.0')
    .addTag('thy')
    .build();
  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
} 

bootstrap();
