import { Injectable } from '@nestjs/common';
const Redis = require ("ioredis");

@Injectable()

export class RedisRepositoryService 
{
    private db; // DataBase

    constructor() 
    {
        this.db = new Redis({
            port: process.env.REDIS_PORT || 6379, // Redis port
            host: process.env.REDIS_HOST // LocalHost
        });
    };

    /**
     * Kurze URL hinterlegen
     */
    async set(key: string, value: string): Promise<void> 
    {
        this.db.set(key, value);
    };

    /**
     * Lange URL abfragen
     */
    async get(key: string): Promise<string> 
    {
        return this.db.get(key);
    };

    // async delete(id): Promise<DeleteResult> 
    // {
    //     return await this.redisRepository.service.delete(id);
    // };

    // delete(value: string): string
    // {
    //     return this.db.delete(value);
    // };
}
