import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
/* import { graficaAuxiliar } from "../models/graficaAuxiliar"; */
import { environment } from "src/environments/environment";
import { Recibo } from '../models/recibo.model';


@Injectable({
  providedIn: "root",
})
export class ReciboService {
  private Url = environment.Url + "/cobranza/recibo";
  private UrlPOS = environment.URLRecibo + "/cobranzaV2/recibo";

  constructor(private http: HttpClient) { }

  date(): Observable<string> {
    return this.http.get<string>(`${this.Url}/date`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  signature(httpOptions): Observable<string> {
    return this.http.get<string>(`${this.Url}/sign2`, httpOptions).pipe(
      map((response: any) => {
        // console.log("----->> " + response);
        return response;
      })
    );
  }
  UUID(): Observable<string> {
    return this.http.get<string>(`${this.Url}/uuid`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  pagarDeudaPOS(data:any,idEmpresa){
    return this.http.post<any>(`${this.UrlPOS}/kiosco?idempresa=${idEmpresa}`, data).pipe(
      tap((response: any) => {
        response;
      }),
      map((response: any) => {
        (response as any)
        return response;
      })
    );
  }

  listarecibo(references: string): Observable<Recibo[]> {
    return this.http
      .get<Recibo[]>(`${this.Url}/refenrece?reference=${references}`)
      .pipe(map((response: any) => response.List as Recibo[]));
  }

  pagarDeudasCajaKiosko(data:any,idEmpresa){
    return this.http.post<any>(`${this.UrlPOS}/kiosco?idempresa=${idEmpresa}`, data).pipe(
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
