import { Propietario } from "../model/propietario";

export class MascotaDTO {
  id: Number
  tipoMascota: String;
  nombre: String;
  raza: String;
  createAt: Date;
  active: Boolean
  propietario: Propietario
  idPersonaRegistro: Number

}