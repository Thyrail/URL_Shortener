import { INestApplication, Post } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule, ApiProperty } from '@nestjs/swagger';
import { OpenAPI } from './swagger.config';

export function createDocument(app: INestApplication): OpenAPIObject 
{
    const builder = new DocumentBuilder()
    .setDescription(OpenAPI.title)
    .setTitle(OpenAPI.description)
    .setVersion(OpenAPI.version)
    
    .addBearerAuth({ 
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'},
        'access-token')

    for (const tag of OpenAPI.tags)
    {
        builder.addTag(tag);
    }

    const options = builder.build();

    return SwaggerModule.createDocument(app, options)
}