import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  UrlRecibo: String = environment.URLRecibo;
  constructor(private http: HttpClient) { }

  traerPersona(valor: string, idempresa: number): Observable<any> {
    return this.http
      .get(`${this.UrlRecibo}/cobranzaV2/personas/buscarPerCli?valor=${valor}&idempresa=${idempresa}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
