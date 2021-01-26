import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { Url } from '../model/url.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent
{
  title = 'URL-Shortener';
  urls: Url[] = [];
  public getShortener$ = new BehaviorSubject({});
  constructor(private apiService: ApiService) { }

  // Jedesmal wenn eine neue URL hinzugefügt wurde, die URLs die in der Datenbank drinnen stehen übertragen und im Frontend anzeigen, shortUrl, longUrl und der Counter, wenn man auf SEite 2 etc blättert sollen nur diese angezeigt werden

  onSubmit(data: any, urlPost: NgForm)
  {
    console.log(data);
    this.apiService.post(data).pipe().subscribe(res =>
    {
      if (data.url === "") return

      let longUrl = data.url;
      let shortUrl = res;

      this.urls.map(url =>
      {
        if (url.shortUrl === res)
        {
          url.counter++;
          return url
        }
        return url
      })

      if (!this.urls.filter(url => url.shortUrl === res).length)
      {
        let urlData =
        {
          longUrl, shortUrl, counter: 1
        }
        this.urls.push(urlData)
      }
      return

    })
    urlPost.reset();
  }
}