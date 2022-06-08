import { Departamento } from "./departamento";
import { PagoServicioDetalle } from "./PagoServicioDetalle";
import { Persona } from "./persona";

export class PagoServicio {
    id:number;
    montoTotal:number;
    createAt:Date;    
    personaRegistro:Persona;
    departamento:Departamento;
    pagoServicioDetalle:PagoServicioDetalle[]

  }
	
	
	