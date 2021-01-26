/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
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
    if(!longUrl) throw 'LongUrl has to be defined';
    
    const hash = md5(longUrl);

    return hash.substring(0, 7);
  }
  
}