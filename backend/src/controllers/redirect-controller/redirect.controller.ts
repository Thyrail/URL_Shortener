/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Param, Redirect } from '@nestjs/common';
import { RedisRepositoryService } from 'src/services/redisRepository.service';

@Controller()
export class RedirectController 
{
    constructor ( private redisRepositoryService: RedisRepositoryService, ) {}

    @Get(':id')
    @Redirect()
    async getRedirectedLongURL(@Param('id') id: string) : Promise<any> 
    {
      const longUrlObj = await this.redisRepositoryService.get(id);
     
      let longUrl: string|null = null;
  
      if (longUrlObj) 
      {
        if (!longUrlObj.url.startsWith('http')) 
        {
          longUrl = 'http://' + longUrlObj.url;
        }
         longUrlObj.counter++; // Counter fürs FrontEnd übergeben für die Aufrufe
         this.redisRepositoryService.set(id, longUrlObj);
         return { url: longUrl }
      } 
        throw new BadRequestException(` `)
    }

}