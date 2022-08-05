import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Empresa } from '../models/empresa.model';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  Urlkiosco: String = environment.IDKiosco;
  Url: String = environment.Url;
  constructor(private http: HttpClient) { }

  listadoEmpresas(data: any) {
    return this.http.post<any>(`${this.Urlkiosco}/cobranzas/v1/empresas`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );

  }

  obtener(idempresa: number): Observable<Empresa> {
    return this.http
      .get(`${this.Url}/cobranza/empresa/ID/${idempresa}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
