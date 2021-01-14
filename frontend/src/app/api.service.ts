import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
    
  private SERVER_URL = "http://localhost:3000/api";

  constructor(private httpClient: HttpClient) { }

  public post(data: object) 
  {
    let headers = new HttpHeaders();

    headers = headers.set('thy-api-token', `${localStorage.getItem('token')}`);
    return this.httpClient.post(`${this.SERVER_URL}`, data, 
    {
        headers: headers,
        responseType: 'text'
    });
  }

  public get() {

  }
  
}