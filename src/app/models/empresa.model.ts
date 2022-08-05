// import { AtcMerchantDataRubroEmpresas } from './atcMerchantDataRubroEmpresas';
import { AtcMerchantDataRubroEmpresas } from './AtcMerchantDataRubroEmpresas';
import { AtcProfileEmpresa } from './AtcProfileEmpresa';
import { Rubro } from './rubro.model';

export class Empresa {
  idempresa: number;
  razon_social: String;
  nombre: String;
  nit: String;
  direccion: String;
  fecha_creacion: String;
  fecha_alta: String;
  usuario_alta: String;
  fecha_modificacion: String;
  usuario_modificacion: String;
  fecha_baja: String;
  usuario_baja: String;
  idpadre: Empresa;
  rubro: Rubro;
  atcMerchantDataRubroEmpresas: AtcMerchantDataRubroEmpresas[];
  atcProfileEmpresa: AtcProfileEmpresa;
}
