import { Familiar } from "./familiar";
import { Mascota } from "./Mascota";
import { Persona } from "./persona";

export class Propietario {
  id: number;
  birthdayDate: Date;

  mascotas:Mascota[]=[];
  familiares:Familiar[]=[];
  numeroCelular:String;
  persona:Persona


  } 