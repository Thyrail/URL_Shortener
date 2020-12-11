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
  @Render('index')
  root() 
  {
    return { message: 'Das ist ein Test!'}
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
  // @Render('index')
  async addShortURL(@Req() request: Request): Promise<string> 
  {
      const longUrl = request.body.url;
      const shortUrlId = this.urlshortenerService.shorten(longUrl);
      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing) 
      {
          throw new BadRequestException(`The id ${shortUrlId} already exists on ${longUrl}`);
      }
      await this.redisRepositoryService.set(shortUrlId, longUrl);

      return `https://localhost:3000/${shortUrlId}`;
  }

  // URL die mit übergeben wird, kürzen zur shortURLid, dann in REDIS nachgucken ob diese shortURLId schon existiert und davon die passende LongURL beziehen und die dann mit der aktuellen Vergleichen die gerade übergeben wird, wenn die gleich sind gibt es keine Kollision

  // @Post()
  // @UseGuards(TokenGuard)
  // async createShortURL(@Body() '')

  /**
   * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab // Test funktioniert
   *
   * @endpoint GET /:id
   */
  @Get(':id') // Neuen Pfad überlegen
  @UseGuards(TokenGuard)
  //@Redirect('/http:')
  async getLongURL(@Param('id') id): Promise<string> 
  {
    const longUrl = await this.redisRepositoryService.get(id);

    if (longUrl) 
    {
       return longUrl
    } 
      throw new BadRequestException(`This URL doesn't exist! ¯\_(ツ)_/¯ `)
  }
  // Anderen Pfad überlegen für ein Get Request, zur Weiterleitung / Redirect zur originalen URL -> Langen URL Die shortUrlId zurückleiten auf die LongURL in einem neuen Pfad zurückgeben localhost:pfad
// Neues Get anlegen mit Redirecting zur LongURL von der shortURLId

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
