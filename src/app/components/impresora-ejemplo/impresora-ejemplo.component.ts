import { Component, OnInit } from '@angular/core';
import { Impresora } from 'src/app/commons/impresora';

@Component({
  selector: 'app-impresora-ejemplo',
  templateUrl: './impresora-ejemplo.component.html',
  styleUrls: []
})
export class ImpresoraEjemploComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  imprimir() {
    const nombreImpresora = "EPSON TM-T20II Receipt";
    let impresora = new Impresora("http://localhost:8000");
    impresora.setFontSize(1, 1);
    impresora.setEmphasize(0);
    impresora.setAlign("left");
    impresora.write("DatecStore SRL.\n");
    impresora.write("Telf. 3312345\n");
    impresora.setAlign("center");
    impresora.write("Comprobante de Pago #1123123\n");
    impresora.setAlign("left");
    impresora.write("Fecha: 09/11/2020 15:00:00\n");
    impresora.write("Concepto: Compra DatecStore\n");
    impresora.setAlign("left");
    impresora.write("--------------------------------\n");
    impresora.write("Detalle              Monto\n");
    impresora.write("--------------------------------\n");
    impresora.write("Mochila para dama    Bs 260,00\n");
    impresora.write("--------------------------------\n");
    impresora.write(" \n");
    impresora.setAlign("right");
    impresora.write("SubTotal      Bs 260,00\n");
    impresora.write("Descuento\n");
    impresora.write("Total         Bs 260,00\n");
    impresora.setAlign("center");
    impresora.write("Gracias por su Compra!\n");
    impresora.setAlign("left");
    impresora.write("Kiosko PagaTodo - Mall Ventura.\n");
    impresora.cut();
    impresora.cutPartial(); // Pongo este y también cut porque en ocasiones no funciona con cut, solo con cutPartial
    impresora.cut();
    impresora.imprimirEnImpresora(nombreImpresora)
      .then(valor => {
        console.log("Al imprimir: " + valor);
      });
  }


}
