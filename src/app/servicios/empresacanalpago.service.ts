import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpresacanalpagoService {

  constructor(private http: HttpClient) { }

  public getIPAddress() {
    return this.http.get("https://ipapi.co/json");
  }
}
