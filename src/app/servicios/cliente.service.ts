import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  Url: String = environment.Url;
  constructor(private http: HttpClient) { }

  reference(data: string, reference: string): Observable<any> {
    return this.http
      .post(`${this.Url}/cobranza/cliente/reference2?reference=${reference}&id=${data}`, "" /* , { headers: this.authorize() } */)
      .pipe(
        map((response) => response),
        catchError((e) => {
          console.log("error cargar " + e);
          if (e.status === 400) {
            return throwError(e);
          }
          console.log(e.error.errores);
          // Swal.fire('Error', `${e.error.errors}`, 'error');
          return throwError(e);
        })
      );
  }
}
