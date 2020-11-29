import { Injectable } from '@nestjs/common';
const md5 = require('md5');

@Injectable()
export class UrlShortenerService {
  shorten(longUrl: string): string {
    const hash = md5(longUrl);

    return hash.substring(0, 7); // https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/String/substring
  }
}
