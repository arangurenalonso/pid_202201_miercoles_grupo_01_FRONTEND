import { Departamento } from "../model/departamento";
import { ProgramacionPagos } from "../model/ProgramacionPagos";


export class CancelarPagoDTO {

  idPersonaRegistro: Number
  pagosACancelar: ProgramacionPagos[];
  departamento:Departamento

}