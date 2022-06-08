import { Departamento } from "./departamento";
import { MonthYear } from "./MonthYear";
import { Persona } from "./persona";
import { Servicio } from "./servicio";

export class BoletaServicio {
    id:number;
    departamento:Departamento;
    servicio:Servicio;
    monthYear:MonthYear;
    createAt:Date;
    fechaVenciemintoPago:Date;
    costo:number;
    estado:number
    personaRegistro:Persona;
    checked:boolean
  

  }
	
	
	