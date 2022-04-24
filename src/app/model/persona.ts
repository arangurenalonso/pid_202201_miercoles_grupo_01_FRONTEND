import { Usuario } from "./usuarios";

export class Persona {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    estado:boolean;
    createAt:Date;
    usuario:Usuario
    personaRegistro:Persona
  }
  