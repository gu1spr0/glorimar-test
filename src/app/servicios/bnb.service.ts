import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { Bnb } from '../models/bnb';

@Injectable({
  providedIn: 'root'
})
export class BnbService {
  private Url = environment.URLbnb;
  constructor(private http: HttpClient) { }

  imagen(data: Bnb) {
    return this.http.post<any>(`${this.Url}/generaqr`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );
  }
  
  consultarQr(data:any){
    return this.http.post<any>(`${this.Url}/confirmapagoqr`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );
  }

  enviarQrEmail(data:any){
    return this.http.post<any>(`${this.Url}/email`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );
  }

}
