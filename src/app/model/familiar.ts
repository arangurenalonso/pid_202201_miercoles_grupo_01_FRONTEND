import { Persona } from "./persona";
import { Propietario } from "./propietario";

export class Familiar {
  id: number;
  parentesco: string;
  birthdayDate: Date;
  propietario: Propietario;
  persona: Persona;


}
