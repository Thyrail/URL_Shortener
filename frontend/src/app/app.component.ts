import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
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

  onSubmit(data: any) {

  // ngOnInit(): void 
  // {
  //   const headers = { 'Authorization': 'thy-api-token', }
  //   this.http.get(`https://localhost:3000/`).subscribe(data => this.getShortener$.next(data));
  // }

  this.http.post('http://localhost:3000/urlshortener', data)
  .subscribe((result) => {
    console.warn('result')
  })
}

  getTransferIP() 
  {
    let header = new HttpHeaders().set(
      "Authorization",
      localStorage.getItem("token")
    );

    return this.hettp.get("http://localhost:3000/transferip", {headers:header});
  
  }

}

