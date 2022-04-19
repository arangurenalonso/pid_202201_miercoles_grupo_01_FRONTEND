import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalMascota:boolean=false;
  
  private _notificarMascota=new EventEmitter<any>();
  constructor() { }
  get notificarMascota():EventEmitter<any>{
    return this._notificarMascota
  }
  abrirMascotaModal(){
    this.modalMascota=true
  }
  cerrarMascotaModal(){
    this.modalMascota=false
  }

}
