import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokeService {
  UrlServ: String = environment.URLService;
  constructor(private http: HttpClient) { }

  traerToken(data: any) {
    return this.http.post<any>(`${this.UrlServ}/SessionRest`, data).pipe(
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
