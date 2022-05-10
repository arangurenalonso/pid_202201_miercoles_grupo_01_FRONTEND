import { Departamento } from "./departamento"
import { Persona } from "./persona"
import { Propietario } from "./propietario"
import { Visitante } from "./visitante"


export class Visita {
  id: Number
  fechaHoraLlegada: Date
  fechaHoraSalida: Date
  motivoVisita: string
  observacionSalida: string

  estado: number;
  createAt: Date;

  propietario_id: Propietario
  departamento_id: Departamento
  visitante_id: Visitante
  idPersonaRegistro: Persona

}
