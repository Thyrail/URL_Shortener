/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Param, Post, Req, Res, BadRequestException, UseGuards} from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';
import { TokenGuard } from 'src/guardian/token.guard'
import * as crypto from 'crypto'

@Controller('api')
// @UseGuards(TokenGuard)
export class UrlshortenerController
{
  constructor(
    private urlshortenerService: UrlShortenerService,
    private redisRepositoryService: RedisRepositoryService,
  ) {}

  @Get('/urlshortener')
  root() 
  {
    return { message: 'Das ist ein Test!'}
  }

  /**
     * 
     * @endpoint GET /:id
     */

  @Post('')
  @UseGuards(TokenGuard) // https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/
  async saveLongUrl(@Req() request: Request): Promise<string>
  { // https://de.wikipedia.org/wiki/Salt_(Kryptologie)
    const longUrl = request.body.url as string;
    const shortUrlId = this.urlshortenerService.shorten(longUrl);
    const inRedis = await this.redisRepositoryService.get(shortUrlId);

    /*if (true)*/ // zum Testen der Kollision
    if (inRedis && longUrl !== inRedis.url) // wenn (der HashWert in REDIS existiert und die dazugespeicherte URL, nicht der URL enstpricht, die der Funktion übergeben wurde)
    {
      const salt = crypto.randomBytes(8).toString('base64');
      const newLongUrl = `${longUrl}${salt}`;
      const newShortUrlId = this.urlshortenerService.shorten(newLongUrl);
      
      await this.redisRepositoryService.set(newShortUrlId, { url: longUrl, counter: 0, salt} )
      console.log(newLongUrl)
    }
    await this.redisRepositoryService.set(shortUrlId, { url: longUrl, counter: 0 });

    return `https://localhost:3000/api/${shortUrlId}`;
  }

  // https://www.geeksforgeeks.org/node-js-crypto-randombytes-method/
  /**
   * if make from longURL a shortURLiD and check than on REDIS if it's available
   * if yes create another shortURLiD for the requested longURL
   * @param id 
   */
 
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


  @Get()
  @UseGuards(TokenGuard)
  async findAll(@Param('id') id: string): Promise<any>
  {
    const findAllURL = await this.redisRepositoryService.get(id)
    return findAllURL;
  }

  // @Post('/shorturl')
  // @Render('index')
  // @UseGuards(TokenGuard)
  // async addShortURL(@Req() request: Request): Promise<string> 
  // {
  //   const longUrl = request.body.url as string;
  //   const shortUrlId = this.urlshortenerService.shorten(longUrl);
  //     const existing = await this.redisRepositoryService.get(shortUrlId);

  //   if (existing)
  //   {
  //     throw new BadRequestException(`The id ${shortUrlId} already exists on ${longUrl}`)
  //   }
  //   await this.redisRepositoryService.set(shortUrlId, { url: longUrl, counter: 0});

  //   return `https://localhost:3000/api/shorturl/${shortUrlId}`;
  // }
}