import { Component } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent 
{
  title = 'Thyrails URL-Shortener';
  
  public getShortener$ = new BehaviorSubject({});
 

  constructor(private http: HttpClient) { }

  ngOnInit(): void 
  {
    const headers = { 'Authorization': 'thy-api-token', }
    this.http.get(`https://localhost:3000/`).subscribe(data => this.getShortener$.next(data));
  }


}

