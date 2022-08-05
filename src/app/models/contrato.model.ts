import { Cliente } from './cliente.model';
import { Deuda } from './deuda.model';

export class Contrato {
    idcontrato: number;
  codcontrato: string;
  razon_social: string;
  fecha_alta: string;
  usuario_alta: string;
  fecha_modificacion: string;
  usuario_modificacion: string;
  fecha_baja: string;
  usuario_baja: string;
  codigocliente: Cliente;
  iddeuda: Deuda;
}
