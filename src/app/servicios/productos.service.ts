import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  Url: String = environment.IDKiosco;
  constructor(private http: HttpClient) { }

  listadoProductos(data: any) {
    return this.http.post<any>(`${this.Url}/api/v1/items`, data).pipe(
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
