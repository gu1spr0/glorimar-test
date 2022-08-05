import { Recibo } from './recibo.model';

export class Detalle {
    iddetalle: number;
    idfactura: number;
    idrecibo: Recibo
    item: string;
    descripcion_item: string;
    cantidad: number;
    precio_unitario: number;
    sub_total: number;
    fecha_alta: string;
    usuario_alta: string;
    fecha_baja: string;
    usuario_baja: string;
}
