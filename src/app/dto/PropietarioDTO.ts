import { Departamento } from "../model/departamento";

export class PropietarioDTO {
  birthdayDate: Date;
  numeroCelular: String;
  nombre: String;
  apellido: String;
  dni: String;
  email: String;
  password: String;
  idPersonaRegistro:Number
  departamentos:Departamento[]
}
   