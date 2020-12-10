/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, HttpService } from '@nestjs/common';
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
   */
  async set(key: string, value: string): Promise<void> 
  {
     this.db.set(key, value);
  }

  /**
   * Lange URL abfragen
   */
  async get(key: string): Promise<string> 
  {
    return await this.db.get(key);
  }

  // async findAll(key: string): Promise<string> {
  //   return await this.db.find(key);
  // }
  
/**
 * Kurze URL löschen
 */
  async del(value: string): Promise<number>
  {
    return await this.db.del(value);
  }
}
