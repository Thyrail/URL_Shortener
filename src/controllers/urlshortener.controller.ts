import { CacheInterceptor, Controller, Delete, Get, Param, Post, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { RedisrepositoryService } from 'src/services/redisRepository.service';
import { UrlshortenerService } from '../services/urlshortener.service';

// localhost:3000/urlshortener
@Controller('')
@UseInterceptors(CacheInterceptor) // https://docs.nestjs.com/techniques/caching

export class UrlshortenerController 
{
    constructor(private urlshortenerService: UrlshortenerService, private redisRepositoryService: RedisrepositoryService) {}

    /**
     * Postman POST body raw json
     *  {
            "url": "www.g2a.com" test 
        }
     * 
     * @endpoint GET /:id
     */
    @Post()
    getShortURL(@Req() request: Request): string 
    {
        // Prüfen, ob request.body.url vorhanden ist
        // Prüfen, ob der Wert eine valide URL ist -> URL steht für: Uniform Resource Locator. In other words, an URL is what gives you access to various HTML pages from the Web. If you are being asked for a valid URL, that simply means the address you entered is wrong.

        const longUrl = request.body.url; 
        const shortUrlId = this.urlshortenerService.shorten(longUrl);

        // Kommunikation mit Redis
        // TODO: Anfrage soll nicht blockierend sein! Eine Asynchrone Funktion machen?
        this.redisRepositoryService.set(shortUrlId, longUrl);
        // IIFE (Immediately invoked function expression)
        // (async() => {
        //     this.redisRepositoryService.set(shortUrlId, longUrl);
        // })();

        // <key>-<value>
        // shortUrlId-longUrl

        return `https://localhost:3000/${shortUrlId}`;
    }

    /**
     * Frage zu einer short URL ID die gespeicherte lange URL von Redis ab
     * 
     * @endpoint GET /:id
     */
    @Get(':id')
    getLongURL(@Param('id') id): string 
    {
        const longUrl = this.redisRepositoryService.get(id);

        if (longUrl) 
        {
            return `Gibt die Original URL aus: ${longUrl}`;
        } 
        else 
        {
            // Gebe eine Fehlermeldung zurück.
        }
    }
    /**
     *  
     * @param id Delete /:id 
     *
     */
    @Delete(':id')
    remove(@Param('id') id: string) {
        return `Die id ${id} wurde erfolgreich gelöscht`;
    }
}


