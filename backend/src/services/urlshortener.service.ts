/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
const md5 = require('md5');

@Injectable()
export class UrlShortenerService 
{
  getLongURL(id: any) 
  {
    throw new Error('Method not implemented.');
  }

  shorten(longUrl: string): string 
  {
    const hash = md5(longUrl);

    return hash.substring(0, 7);
  }
  
}