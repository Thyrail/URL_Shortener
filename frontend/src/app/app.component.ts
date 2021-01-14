import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';
import { takeUntil } from 'rxjs/operators';

interface Url 
{
  longUrl:string,
  shortUrl:string,
  counter:number
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent 
{
  title = 'Thyrails URL-Shortener';
  urls: Url[] = [];
  public getShortener$ = new BehaviorSubject({});
  constructor(private apiService: ApiService) { }

  onSubmit(data: any) {
    
    this.apiService.post(data).pipe().subscribe(res => 
      {
      if(data.url === "") return
      let longUrl = data.url;
      let shortUrl = res;

      this.urls.map(url => 
      {
        if(url.shortUrl === res)
        {
          url.counter++;
          return url
        }
        return url
      })

      if(!this.urls.filter(url => url.shortUrl === res).length) 
      {
        let urlData = 
        {
          longUrl, shortUrl, counter: 0
        }
        this.urls.push(urlData)
      }
      return

    })
  }
}

