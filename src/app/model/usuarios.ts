import { Permiso } from "./Permiso";
import { Persona } from "./persona";
export class Usuario {
    id:number;
    username:string;
    email:string;
    password:string;
    lastLoginDateDisplay:Date;
    lastLoginDate:Date;
    isActive:boolean=true;
    isNotLocked:boolean=true;
    persona:Persona;
    permiso:Permiso[]=[];  
  }

	
	