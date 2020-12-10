/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, Render, Body, Redirect, BadRequestException, UseGuards} from '@nestjs/common';
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
  @UseGuards(TokenGuard)
  @Render('index')
  root() 
  {
    return this.urlshortenerService
  }

  // @Get(':id')
  // @UseGuards(TokenGuard)
  // async findAll(@Param('id') id): Promise<string> 
  // {
  //   const getAllShortUrls = await this.redisRepositoryService.findAll(id)

  //   return getAllShortUrls;
  // }

  /**
     * 
     * @endpoint GET /:id
     */

  @Post()
  @UseGuards(TokenGuard)
  @Render('index')
  async addShortURL(@Req() request: Request ): Promise<string> 
  {
      const longUrl = request.body.url;
      const shortUrlId = await this.urlshortenerService.shorten(longUrl);
      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing) 
      {
          throw new BadRequestException(`The id ${shortUrlId} already exists on ${longUrl}`);
      }
      await this.redisRepositoryService.set(shortUrlId, longUrl);

      return `https://localhost:3000/${shortUrlId}`;
  }

  // @Post()
  // @UseGuards(TokenGuard)
  // async createShortURL(@Body() '')

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
