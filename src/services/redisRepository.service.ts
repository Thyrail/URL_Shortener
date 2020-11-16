import { Injectable } from '@nestjs/common';
const Redis = require ("ioredis");

@Injectable()
export class RedisrepositoryService 
{
    private db; // DataBase

    constructor() 
    {
        this.db = new Redis({
            port: process.env.REDIS_PORT, // Redis port
            host: process.env.REDIS_HOST  // LocalHost
          });
    }

    /**
     * Kurze URL hinterlegen
     */
    set(key: string, value: string): void 
    {
        this.db.set(key, value);
    }

    /**
     * Lange URL abfragen
     */
    get(key: string): string 
    {
        return this.db.get(key);
    }
}
