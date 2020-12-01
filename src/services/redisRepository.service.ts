/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
const Redis = require('ioredis');

@Injectable()
export class RedisRepositoryService 
{
  private db; // DataBase
  
  // export class TokenGuard implements CanActivate {
  //   canActivate(context: ExecutionContext): boolean {
  //     const req = context.switchToHttp().getRequest();
  //     const authHeader = req.headers.authorization;
  //     const token = authHeader.split(' ')[1];
  //     return token === 'ihaveaccess';
  //   }
  // }

  constructor() 
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

  async findAll(key: string): Promise<string> {
    return await this.db.find(key);
  }

  async del(value: string): Promise<number>
  {
    return await this.db.del(value);
  }
}
