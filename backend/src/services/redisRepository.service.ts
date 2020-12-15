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
    let counter: number

    this.db.set(key, value)
    // this.db.set(JSON.stringify({key, value}))

    counter++
  }

 // Optimieren mit JSON.stringify als JSON Object, Counter wie oft was aufgerufen wird und darin die Informationen speichern ob es eine kollision gab


  /**
   * Lange URL abfragen
   */
  async get(key: string): Promise<string> 
  {
    return await this.db.get(key);
  }

  // async getLongURL(key: string): Promise<any>
  // {
  //   return this.db.set("key:id", JSON.stringify();)
  // }

  // async findAll(key: string): Promise<string> {
  //   return await this.db.get(key);
  // }
  
/**
 * Kurze URL löschen
 */
  async del(value: string): Promise<number>
  {
    return await this.db.del(value);
  }
}
