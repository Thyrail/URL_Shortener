import { Test, TestingModule } from '@nestjs/testing';
import { RedisRepositoryService } from './redisRepository.service';
import ConfigService from '@nestjs/config';
import { Injectable, HttpService } from '@nestjs/common';
import { UrlshortenerController } from 'src/controllers/urlshortener.controller';
import { UrlShortenerService } from './urlshortener.service';
import { InjectRedisClient } from '../decorators';
import * as redis from 'redis-mock'

const client = redis.createClient({ host: '123.0.0.1', port: 6379 });

const redisMock = require('redis-mock');

describe('redis', () => {
  jest.doMock('redis', () => jest.fn(() => redisMock)); 
  const redis = require('./redis');
})