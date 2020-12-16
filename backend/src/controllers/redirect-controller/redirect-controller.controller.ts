/* eslint-disable prettier/prettier */
import { BadRequestException, Controller, Get, Param, Redirect } from '@nestjs/common';
import { RedisRepositoryService } from 'src/services/redisRepository.service';

@Controller()
export class RedirectControllerController 
{
    constructor(
        private redisRepositoryService: RedisRepositoryService,
      ) {}

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
         longUrlObj.counter++;
         this.redisRepositoryService.set(id, longUrlObj);
         return { url: longUrl }
      } 
        throw new BadRequestException(` `)
    }

}

