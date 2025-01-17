/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpService } from '@nestjs/common';
import { iUrlShortener } from '../model/urlshortener.model'
const Redis = require('ioredis');

@Injectable()
export class RedisRepositoryService 
{
  private db; // DataBase
  
  constructor(private http: HttpService) 
  {
    this.db = new Redis({
      port: process.env.REDIS_PORT || 6379, // Redis port
      host: process.env.REDIS_HOST, // LocalHost
    });
    // this.db.keys
  }

  //Kurze URL hinterlegen
  //JSON.stringify() Methode konvertiert einen JavaScript-Wert in einen JSON-String
  set(key: string, shortenObj: iUrlShortener)
  {
    this.db.set(key, JSON.stringify(shortenObj))
  }

  //Lange URL abfragen
  //JSON.parse() erzeugt aus einem JSON-formatierten Text ein JavaScript-Objekt
  async get(key: string): Promise<iUrlShortener> 
  {
    const val = await this.db.get(key);
    return JSON.parse(val) as iUrlShortener;
  }

  //Kurze URL löschen 
  async del(value: string): Promise<number>
  {
    return await this.db.del(value);
  }

  // async findAll(key: string): Promise<iUrlShortener>
  // {
  //   const val = await this.db.get(key);
  //   return JSON.parse(val) as iUrlShortener;
  // }

  // async getShortUrl(key: string, shortenObj: iUrlShortener): Promise<any>
  // {
  //   const shortid = await this.db.get(shortenObj);
  //   return JSON.parse(shortid) as iUrlShortener;
  // }
}