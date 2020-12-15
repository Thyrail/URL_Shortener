/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, Render, Body, Redirect, BadRequestException, UseGuards, Query} from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';
import { TokenGuard } from 'src/guardian/token.guard'

@Controller('api')
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


  // @Get()
  // @UseGuards(TokenGuard)
  // async findAll(@Query() query): Promise<string> 
  // {
  //   const getAllShortUrls = await this.redisRepositoryService.findAll(query.id)

  //   return getAllShortUrls;
  // }

  /**
     * 
     * @endpoint GET /:id
     */

  @Post('/shorturl')
  @UseGuards(TokenGuard)
  // @Render('index')
  async addShortURL(@Req() request: Request): Promise<string> 
  {
      const longUrl = request.body.url;
      const shortUrlId = this.urlshortenerService.shorten(longUrl);
      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing)
      {
          throw new BadRequestException(`The id ${shortUrlId} already exists on ${longUrl}`)
      }
      await this.redisRepositoryService.set(shortUrlId, longUrl);
      // await this.redisRepositoryService.set(JSON.parse(shortUrlId), longUrl);

      return `https://localhost:3000/api/shorturl/${shortUrlId}`;
  }

  // URL die mit übergeben wird, kürzen zur shortURLid, dann in REDIS nachgucken ob diese shortURLId schon existiert 
  // und davon die passende LongURL beziehen und die dann mit der aktuellen Vergleichen die gerade übergeben wird, 
  // wenn die gleich sind gibt es keine Kollision

  /**
   * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab // Test funktioniert
   *
   * @endpoint GET /:id
   */

  @Get('/longurl/:id') // Neuen Pfad überlegen
  @UseGuards(TokenGuard)
  async getLongURL(@Param('id') id) : Promise<any> 
  {
    const longUrl = await this.redisRepositoryService.get(id);

    if (longUrl) 
    {
       return { url: longUrl }
    } 
      throw new BadRequestException(`This URL doesn't exist! ¯\_(ツ)_/¯ `)
      // res.render('index')
  }

  @Get('/redirect/:id')
  @Redirect()
  async getRedirectedLongURL(@Param('id') id) : Promise<any> 
  {
    let longUrl = await this.redisRepositoryService.get(id);
    console.log(longUrl);

    if (longUrl) 
    {
      if (!longUrl.startsWith('http')) 
      {
        longUrl = 'http://' + longUrl;
      }
       return { url: longUrl }
    } 
      throw new BadRequestException(`This URL doesn't exist! ¯\_(ツ)_/¯ `)
  }
  // Anderen Pfad überlegen für ein Get Request, zur Weiterleitung / Redirect zur originalen URL -> Langen URL auf die shortUrlId zurückleiten auf die LongURL in einem neuen Pfad zurückgeben localhost:pfad
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
