import { Empresa } from './empresa.model';
import { Persona } from './persona.model';

export class Cliente {
    codigocliente: number;
    idpersona: Persona;
    idempresa: Empresa;
    estado: String;
    fecha_up_cliente: String;
    codigo_cliente: String;
    fecha_alta: String;
    usuario_alta: String;
    fecha_modificacion: String;
    usuario_modificacion: String;
    fecha_baja: String;
    usuario_baja: String;
}
