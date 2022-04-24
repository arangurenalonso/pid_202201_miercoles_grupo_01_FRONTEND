import { Persona } from "./persona";
import { Propietario } from "./propietario";

export class Mascota {
    id:Number
    tipoMascota:String;
    nombre:String;
    raza:String;
    createAt:Date;
    active:Boolean
    propietario:Propietario
    personaRegistro:Persona
  }
  