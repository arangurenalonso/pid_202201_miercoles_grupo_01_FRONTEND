import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalMascota:boolean=false;
  modalFamiliar:boolean=false;

  private _notificarMascota=new EventEmitter<any>();
  private _notificarFamiliar=new EventEmitter<any>();
  constructor() { }
  get notificarMascota():EventEmitter<any>{
    return this._notificarMascota
  }
  get notificarFamiliar():EventEmitter<any>{
    console.log("ENTRO EN")
    return this._notificarFamiliar
  }
  abrirMascotaModal(){
    this.modalMascota=true
  }
  cerrarMascotaModal(){
    this.modalMascota=false
  }
  abrirFamiliarModal(){
    console.log("Abrir el modal Familiar")
    this.modalFamiliar=true
  }
  cerrarFamiliarModal(){
    this.modalFamiliar=false
  }

}
