import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeudaService {
  Urlkiosco: String = environment.IDKiosco;
  Url: String = environment.Url;
  UrlServ: String = environment.URLService;
  constructor(private http: HttpClient) { }

  deudas(codigoCliente: number, idEmpresa: number) {
    return this.http.post(`${this.Urlkiosco}/cobranzas/v1/deudas`, {
      codigoCliente, idEmpresa
    })
  }

  carrito(iddeuda: string): Observable<any> {
    return this.http.get(`${this.Url}/cobranza/deuda/array/${iddeuda}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  crearDeuda(data: any) {
    return this.http.post<any>(`${this.UrlServ}/PagoRest/Kiosco`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );

  }

  actualizarDeuda(idrecibo, valor): Observable<any> {
    return this.http
      .post(`${this.Url}/PagoRest/KioscoUpdate?idrecibo=${idrecibo}&valor=${valor}`, '')
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
