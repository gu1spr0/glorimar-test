import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Parametrica } from '../models/parametrica.model';


@Injectable({
  providedIn: 'root'
})
export class ParametricaService {
  private Url = environment.Url + "/cobranza/parametrica";
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

  constructor(private http: HttpClient, private router: Router) { }

  obtener2(
    descrip: string,
    glosa: string,
    codigo: string
  ): Observable<Parametrica> {
    return this.http.get<Parametrica>(`${this.Url}/obtener/pais?descrip=${descrip}&glosa=${glosa}&codigo=${codigo}`).pipe(
      tap((response) => {
        response;
      }),
      map((response: Parametrica) => {
        return response;
      })
    );
  }
  obtenerciudades(
    descrip: string
  ): Observable<any> {
    return this.http.get<any>(`${this.Url}/obtener/ciudades?descrip=${descrip}`).pipe(
      tap((response: any) => {
        // console.log(response)
        response;
      }),
      map((response: Parametrica[]) => {
        // console.log(response)
        return response;
      })
    );
  }
}
