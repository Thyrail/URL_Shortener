/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, Render, BadRequestException, UseGuards} from '@nestjs/common';
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

  /**
     * 
     * @endpoint GET /:id
     */

  @Post('/shorturl')
  @UseGuards(TokenGuard)
  // @Render('index')
  async addShortURL(@Req() request: Request): Promise<string> 
  {
      const longUrl = request.body.url as string;
      const shortUrlId = this.urlshortenerService.shorten(longUrl);
      const existing = await this.redisRepositoryService.get(shortUrlId);

      if (existing)
      {
          throw new BadRequestException(`The id ${shortUrlId} already exists on ${longUrl}`)
      }
      await this.redisRepositoryService.set(shortUrlId, { url: longUrl, counter: 0});

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

  @Get('/longurl/:id')
  @UseGuards(TokenGuard)
  async getLongURL(@Param('id') id: string) : Promise<string> 
  {
    const longUrl = await this.redisRepositoryService.get(id);

    if (longUrl) 
    {
      return longUrl.url;
    } 
      throw new BadRequestException(`This URL doesn't exist! ¯\_(ツ)_/¯ `)
      // res.render('index')
  }
  

  @Delete(':id')
  @UseGuards(TokenGuard)
  async deleteShortURL(@Param('id') id: string): Promise<string> 
  {
    const deleteShortUrl = await this.redisRepositoryService.del(id)

    if (deleteShortUrl) 
    {
      return `The target URL was successfully destroyed! ︻デ┳=--- #${this.redisRepositoryService.del(id)}`;
    }
    throw new BadRequestException(`This id has already been destroyed by the Dark side of the Force.`)
  }

}
