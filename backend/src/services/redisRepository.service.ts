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
  }

  /**
   * Kurze URL hinterlegen
   * JSON.stringify() Methode konvertiert einen JavaScript-Wert in einen JSON-String
   */
  async set(key: string, shortenObj: iUrlShortener): Promise<any> 
  {
    this.db.set(key, JSON.stringify(shortenObj))
  }

  /**
   * Lange URL abfragen
   * JSON.parse() erzeugt aus einem JSON-formatierten Text ein JavaScript-Objekt
   */
  async get(key: string): Promise<iUrlShortener> 
  {
    const val = await this.db.get(key);
    return JSON.parse(val) as iUrlShortener;
  }
  
/**
 * Kurze URL löschen
 */
  async del(value: string): Promise<number>
  {
    return await this.db.del(value);
  }
}
