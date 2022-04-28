import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalMascota:boolean=false;
  modalFamiliar:boolean=false;
  modalPropietarioDepartamento:boolean=false;

  private _notificarMascota=new EventEmitter<any>();
  private _notificarFamiliar=new EventEmitter<any>();
  private _notificarPropietarioDepartamento=new EventEmitter<any>();
  private _notificarAbrirModalPropietarioDepartamento=new EventEmitter<any>();
  constructor() { }


  get notificarMascota():EventEmitter<any>{
    return this._notificarMascota
  }
  get notificarFamiliar():EventEmitter<any>{
    return this._notificarFamiliar
  }
  get notificarPropietarioDepartamento():EventEmitter<any>{
    return this._notificarPropietarioDepartamento
  }

  get notificarAbrirModalPropietarioService():EventEmitter<any>{
    console.log("PASOOOOOOOOOOOOOOOOOO 2")
    return this._notificarAbrirModalPropietarioDepartamento
  }

  abrirPropietarioDepartamentoModal(){
    console.log("PASOOOOOOOOOOOOOOOOOO 1")
    this.notificarAbrirModalPropietarioService.emit()
    this.modalPropietarioDepartamento=true
  }
  cerrarPropietarioDepartamentoModal(){
    this.modalPropietarioDepartamento=false
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
