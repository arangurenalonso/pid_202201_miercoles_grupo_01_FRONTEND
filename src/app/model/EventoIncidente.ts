import { Departamento } from "./departamento";
import { HistorialIncidentes } from "./HistorialIncidentes";
import { Incidente } from "./Incidente";
import { PagoServicioDetalle } from "./PagoServicioDetalle";
import { Persona } from "./persona";

export class EventoIncidente {
    id:number;
    departamento:Departamento;
    incidente:Incidente;    
    estado:number;
    historialIncidentes:HistorialIncidentes[]
    comentario:string

  }
	
	 


	