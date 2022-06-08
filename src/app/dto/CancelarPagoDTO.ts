import { BoletaServicio } from "../model/BoletaServicio";
import { Departamento } from "../model/departamento";


export class CancelarPagoDTO {

  idPersonaRegistro: Number
  pagosACancelar: BoletaServicio[];
  departamento:Departamento

}