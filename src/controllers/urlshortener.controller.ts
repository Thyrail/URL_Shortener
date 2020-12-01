/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, Render, UseFilters, ForbiddenException, Body, NotFoundException, Redirect, BadRequestException, UseGuards, SetMetadata } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';
import { TokenGuard } from 'src/guardian/token.guard'

@Controller('')
// @UseGuards(TokenGuard)
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
    return { message: 'Whazzzaaaaap!' };
  }
  /**
     * 
     * @endpoint GET /:id
     */

  @Post()
  @UseGuards(TokenGuard)
  async addShortURL(@Req() request: Request): Promise<string> 
  {
      const longUrl = request.body.url;
      const shortUrlId = await this.urlshortenerService.shorten(longUrl);
      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing) 
      {
          throw new BadRequestException(`The Id: ${shortUrlId} already exists!`);
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
  @UseGuards(TokenGuard)
  //@Redirect
  async getLongURL(@Param('id') id): Promise<string> 
  {
    const longUrl = await this.redisRepositoryService.get(id);

    if (longUrl) 
    {
       return longUrl
    } 
      throw new BadRequestException(`This URL doesn't exist! ¯\_(ツ)_/¯ `)
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string): Promise<string> {
  //   return this.redisRepositoryService.findAll(id)[0]
  // }

  @Delete(':id')
  @UseGuards(TokenGuard)
  async deleteShortURL(@Param('id') id): Promise<string> 
  {
    const deleteShortUrl = await this.redisRepositoryService.del(id)

    if (deleteShortUrl) 
    {
      return `The target URL was successfully destroyed! ︻デ┳=--- #${this.redisRepositoryService.del(id)}`;
    }
    throw new BadRequestException(`This id has already been destroyed by the Dark side of the Force.`)
  }

}
