import { Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { RedisRepositoryService } from 'src/services/redisRepository.service';
import { UrlShortenerService } from '../services/urlshortener.service';

// localhost:3000/urlshortener
@Controller('')

export class UrlshortenerController 
{
    constructor(private urlshortenerService: UrlShortenerService,
                private redisRepositoryService: RedisRepositoryService) {}
    /**
     * Postman POST body raw json // Test funktioniert
     *  {
            "url": "www.g2a.com"
        }
     * 
     * @endpoint GET /:id
     */
    @Post()
    async addShortURL(@Req() request: Request): Promise<string>
    {
        // Prüfen, ob request.body.url vorhanden ist
        // Prüfen, ob der Wert eine valide URL ist -> URL steht für: Uniform Resource Locator. In other words, an URL is what gives you access to various HTML pages from the Web. If you are being asked for a valid URL, that simply means the address you entered is wrong.

        const longUrl = request.body.url; 
        const shortUrlId = this.urlshortenerService.shorten(longUrl);

        // Kommunikation mit Redis
        // Anfrage soll nicht blockierend sein.. Eine Asynchrone Funktion machen?

        // IIFE (Immediately invoked function expression)
        (async() => {
            this.redisRepositoryService.set(shortUrlId, longUrl);
        })();
        // this.redisRepositoryService.set(shortUrlId, longUrl);

        // <key>-<value>
        // shortUrlId-longUrl

        return `https://localhost:3000/${shortUrlId}`;
    };
    
    @Post()
    async checkForShortURL(@Param() request: Request): Promise<string>
    {
        return
    }
    /**
     * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab // Test funktioniert
     * 
     * @endpoint GET /:id
     */
    @Get(':id')
    async getLongURL(@Param('id') id): Promise<string> 
    {
        const longUrl = this.redisRepositoryService.get(id);

        if (longUrl) 
        {
            return longUrl;
        } 
        else 
        {
            //
        }
    };

    @Delete(':id/delete')
    async deleteShortURL(@Param('id') id): Promise<any>
    {
        return this.redisRepositoryService.del(id)
    }

}


