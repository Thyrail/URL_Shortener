/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, Render, UseFilters, ForbiddenException, Body, NotFoundException, Redirect, BadRequestException, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';
import { TokenGuard } from 'src/guardian/token.guard'

@Controller('')
@UseGuards(TokenGuard)
export class UrlshortenerController
{
  constructor(
    private urlshortenerService: UrlShortenerService,
    private redisRepositoryService: RedisRepositoryService,
  ) {}

  @Get('/urlshortener')
  @Render('index')
  root() 
  {
    return { message: 'Hello world!' };
  }
  /**
     * 
     * @endpoint GET /:id
     */

  @Post()
  async addShortURL(@Req() request: Request): Promise<string> 
  {
      const longUrl = request.body.url;
      const shortUrlId = await this.urlshortenerService.shorten(longUrl);

      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing) 
      {
          throw new BadRequestException(`The Id: ${shortUrlId} already exists`);
      }
      await this.redisRepositoryService.set(shortUrlId, longUrl);

      return `https://localhost:3000/${shortUrlId}`;
  }

  /**
   * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab // Test funktioniert
   *
   * @endpoint GET /:id
   */
  @Get(':id')
  //@Redirect('https://localhost:3000', 302)
  //@UseFilters()
  async getLongURL(@Param('id') id): Promise<string> 
  {
    const longUrl = this.redisRepositoryService.get(id);

    if (longUrl) 
    {
      return longUrl
    } 
      throw new NotFoundException('404')
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<string> {
  //   return this.redisRepositoryService.findAll(id)[0]
  // }

  @Delete(':id')
  //@UseFilters()
  async deleteShortURL(@Param('id') id): Promise<string> 
  {
    if (id) 
    {
      return `The URL got successful deleted! #${this.redisRepositoryService.del(id)}`;
    }
      throw new NotFoundException('404')
  }

}
