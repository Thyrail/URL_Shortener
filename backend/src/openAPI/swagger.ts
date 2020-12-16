/* eslint-disable prettier/prettier */
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { OpenAPI } from './swagger.config';

export function createDocument(app: INestApplication): OpenAPIObject 
{
  const builder = new DocumentBuilder()
    .setTitle(OpenAPI.title)
    .setDescription(OpenAPI.description)
    .setVersion(OpenAPI.version)
    .addTag(OpenAPI.tags)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    );

  const options = builder.build();

  return SwaggerModule.createDocument(app, options);
}
