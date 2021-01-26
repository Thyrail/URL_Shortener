import { Test, TestingModule } from '@nestjs/testing';
import { UrlShortenerService } from './urlshortener.service';
const md5 = require('md5');


const longUrl = 'www.test.de'

describe('UrlshortenerService', () => 
{
  let service: UrlShortenerService;

  beforeEach(async () => 
  {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortenerService],
    }).compile();

    service = module.get<UrlShortenerService>(UrlShortenerService);
  });
  

  it('should be defined', () => 
  {
    expect(service).toBeDefined();
  });


  describe('method: shorten', () => 
  {
    it('should be defined', () => 
    {
      expect(service.shorten).toBeDefined();
    })


    it('result should be defined', () => 
    {
      expect(service.shorten(longUrl)).toBeDefined();
    })


    it('result should have a length of 7', () => 
    {
      expect(service.shorten(longUrl).length).toEqual(7);
    })


    it('parameter null should throw an error', () => 
    {
      try 
      {
        service.shorten(null as any);
      } 
      catch (error) 
      {
        expect(error).toEqual('LongUrl has to be defined');
        return;
      }

      fail('exception should be thrown');
    })


    it('result is md5', () => 
    {
      expect(service.shorten(longUrl)).toEqual(md5(longUrl).substring(0, 7));
    })


    it('test multiple', () => 
    {
      for(let i = 0; i < 1000; i++) 
      {
        const newUrl = `${longUrl}/${i}`;
        expect(service.shorten(newUrl)).toEqual(md5(newUrl).substring(0, 7));
      }

    })

  })

});