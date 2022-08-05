import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footerEmpresa',
  templateUrl: './footerEmpresa.component.html',
  styleUrls: []
})
export class FooterEmpresaComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  regresar() {
    this.router.navigate(['kiosco', 'pantalla-descanso'])
  }

  enviar() {
    this.router.navigate(['persona', 'clientes'])
  }


}
