import { Controller, Delete, Get, Param, Post, Req, Res, Render, UseFilters, ForbiddenException, Body, NotFoundException } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';

// localhost:3000/urlshortener
@Controller()
export class UrlshortenerController 
{
  constructor(
    private urlshortenerService: UrlShortenerService,
    private redisRepositoryService: RedisRepositoryService,
  ) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }
  /**
     * 
     * @endpoint GET /:id
     */
  @Post()
  //@UseFilters()
  async addShortURL(@Req() request: Request): Promise<string> 
  {
    // Prüfen, ob request.body.url vorhanden ist
    // Prüfen, ob der Wert eine valide URL ist

    const longUrl = request.body.url;
    const shortUrlId = await this.urlshortenerService.shorten(longUrl);

    // Kommunikation mit Redis

    // IIFE (Immediately invoked function expression)
    // (async () => {
    //   this.redisRepositoryService.set(await shortUrlId, longUrl);
    // })();
    this.redisRepositoryService.set(shortUrlId, longUrl);

    // <key>-<value>
    // shortUrlId-longUrl

    return `https://localhost:3000/${shortUrlId}`;
  }

  /**
   * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab // Test funktioniert
   *
   * @endpoint GET /:id
   */
  @Get(':id')
  //@UseFilters()
  async getLongURL(@Param('id') id): Promise<string> 
  {
    const longUrl = this.redisRepositoryService.get(id);

    if (!longUrl) 
    {
      throw new NotFoundException('This Post does not exist');
    } 
    else 
    {
    //   return `There exists no LongURL under these ID!` 
    }
  }


  @Delete(':id')
  //@UseFilters()
  async deleteShortURL(@Param('id') id): Promise<string> 
  {
    return `The URL got successful deleted! #${this.redisRepositoryService.del(id)}`;
  }


}
