import { Contrato } from './contrato.model';
import { Detalle } from './detalle.model';
import { Deuda } from './deuda.model';

export class Recibo {
  idrecibo: number;
  idprogramacion: number;
  tipo_recibo: String;
  nro_recibo: number;
  monto: number;
  glosa1: string;
  glosa2: string;
  fecha_vencimiento: String;
  estado: String;
  monto_interes: number;
  monto_cargo: number;
  concepto_recibo: String;
  descripcion_general: String;
  periodo: String;
  lote: string;
  moneda: number;
  fecha_alta: String;
  usuario_alta: String;
  fecha_modificacion: String;
  usuario_modificacion: String;
  codigo_pago: string;
  idcontrato: Contrato;
  iddeuda: Deuda;
  detalle: Detalle;
}
