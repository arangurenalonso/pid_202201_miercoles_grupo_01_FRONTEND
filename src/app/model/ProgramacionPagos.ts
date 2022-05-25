import { Departamento } from "./departamento";
import { MonthYear } from "./MonthYear";
import { Persona } from "./persona";
import { Servicio } from "./servicio";

export class ProgramacionPagos {
    id:number;
    departamento:Departamento;
    servicio:Servicio;
    monthYear:MonthYear;
    createAt:Date;
    estado:number
    personaRegistro:Persona;

  

  }
	
	
	