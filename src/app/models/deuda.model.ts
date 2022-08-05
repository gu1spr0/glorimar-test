import { Cliente } from './cliente.model';
import { Contrato } from './contrato.model';
import { Recibo } from './recibo.model';

export class Deuda {
    iddeuda: number;
    idfactura: number;
    idcontrato: Contrato;
    fecha_alta: String;
    usuario_alta: String;
    fecha_modificacion: String;
    usuario_modificacion: String;
    fecha_baja: String;
    usuario_baja: String;
    estado: String;
    idrecibo: Recibo;
    codigocliente: Cliente;
    observacion: string;
}
