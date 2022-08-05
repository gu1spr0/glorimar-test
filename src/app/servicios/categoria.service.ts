import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  Url: String = environment.IDKiosco;
  constructor(private http: HttpClient) { }

  listadoCategorias(data: any) {
    return this.http.post<any>(`${this.Url}/api/v1/categorias`, data).pipe(
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
