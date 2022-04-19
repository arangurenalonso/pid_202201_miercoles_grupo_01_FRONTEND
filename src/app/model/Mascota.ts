import { Propietario } from "./propietario";

export class Mascota {
    id:Number
    tipoMascota:String;
    nombre:String;
    raza:String;
    createAt:Date;
    isActive:boolean
    propietario:Propietario
  }
 