import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ApiService {
    constructor(private http: HttpClient) {}

    // getTransferIp() {
    //     let header = new HttpHeaders().set(
    //         "Authorization",
    //         localStorage.getItem("token")
    //     );

    //     return this.http.get("http://localhost:3000/transferip", {headers:header});
    // }
}