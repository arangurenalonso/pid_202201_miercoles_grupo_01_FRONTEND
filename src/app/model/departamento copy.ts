import { Departamento } from "./departamento";
import { Persona } from "./persona";
import { Propietario } from "./propietario";

export class PropietarioDepartamento {
    id: number;
    propietario: Propietario;
    departamento: Departamento;
    estado:Boolean
  }