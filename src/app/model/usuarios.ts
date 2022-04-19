import { Permiso } from "./Permiso";
import { Persona } from "./persona";
export class Usuario {
    id:number;
    email:string;
    password:string;
    lastLoginDateDisplay:Date;
    lastLoginDate:Date;
    active:boolean=true;
    notLocked:boolean=true;
    persona:Persona;
    permiso:Permiso[]=[];  
    foto: string;
  }

	