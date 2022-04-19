import { Mascota } from "./Mascota";
import { Persona } from "./persona";

export class Propietario {
  id: number;
  birthdayDate: Date;

  mascotas:Mascota[]=[];
  numeroCelular:String;
  persona:Persona
  } 