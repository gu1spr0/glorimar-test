import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CargarScriptsService {

  constructor(private http: HttpClient) { }

  cargar(archivos: string[]) {
    for (const archivo of archivos) {
      const script = document.createElement("script");
      script.src = "../../assets/js/" + archivo + ".js";
      const body = document.getElementsByTagName("body")[0];
      body.appendChild(script);
    }
  }

}
