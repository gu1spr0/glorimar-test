import { Empresa } from './empresa.model';


export class AtcProfileEmpresa {
  idprofile: number;
  accessKey: string;
  datoAdicional1: string;
  datoAdicional2: string;
  estado: string;
  modeProfile: string;
  orgId: string;
  profileId: string;
  secretKey: string;
  sessionId: string;
  empresas: Empresa[]
}