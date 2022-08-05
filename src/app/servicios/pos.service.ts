import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PosService {
  Url: String = environment.IDKiosco;
  constructor(private http: HttpClient) {
  }

  pagarChip(ippos, total): Observable<any> {
    return this.http
      .get(`http://localhost:5701/chip/${ippos}/${total}`)
      /*  .get(`https://181.188.147.73:4011/chip/${ippos}/${total}`) */
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  getIpPosAtc(codigoKiosko) {
    return this.http
      .get(`${this.Url}/api/v1/${codigoKiosko}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

}
