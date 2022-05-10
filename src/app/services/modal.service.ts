import { EventEmitter, Injectable } from '@angular/core';
import { Visitante } from '../model/visitante';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalMascota:boolean=false;
  modalFamiliar:boolean=false;
  modalPropietarioDepartamento:boolean=false;
  
  switchModalBuscarVisitante:boolean=false;
  
  private _notificarAbrirModalBuscarVisitante=new EventEmitter<any>();
  private _notificarCerrarModalBuscarVisitante=new EventEmitter<any>();

  private _notificarMascota=new EventEmitter<any>();
  private _notificarFamiliar=new EventEmitter<any>();
  private _notificarPropietarioDepartamento=new EventEmitter<any>();
  private _notificarAbrirModalPropietarioDepartamento=new EventEmitter<any>();
  
  get notificarAbrirModalBuscarVisitante():EventEmitter<any>{
    return this._notificarAbrirModalBuscarVisitante
  }
  get notificarCerrarModalBuscarVisitante():EventEmitter<any>{
    return this._notificarCerrarModalBuscarVisitante
  }
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
    return this._notificarAbrirModalPropietarioDepartamento
  }
 
  constructor() { }

  abrirModalBuscarVisitante(){
    console.log("BBBBBBBBBBBBBBBBBBBBBBBB")
    this.switchModalBuscarVisitante=true
    this._notificarAbrirModalBuscarVisitante.emit()
  }


  cerrarModalBuscarVisitante(visitante:Visitante){
    this.switchModalBuscarVisitante=false
    this._notificarCerrarModalBuscarVisitante.emit(visitante)
  }


  abrirPropietarioDepartamentoModal(){
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
    this.modalFamiliar=true
  }
  cerrarFamiliarModal(){
    this.modalFamiliar=false
  }

}
