import { EventEmitter, Injectable } from '@angular/core';
import { EventoIncidente } from '../model/EventoIncidente';
import { PagoServicio } from '../model/PagoServicio';
import { Visitante } from '../model/visitante';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modalMascota:boolean=false;
  modalFamiliar:boolean=false;
  modalPropietarioDepartamento:boolean=false;  
  switchModalBuscarVisitante:boolean=false;
  switchModalFinalizarVisita:boolean=false;
  switchModalDetallePago:boolean=false;

  switchModalFinalizarIncidente:boolean=false;
  
  private _notificarAbrirModalFinalizarIncidente=new EventEmitter<any>();
  private _notificarCerrarModalFinalizarIncidente=new EventEmitter<any>();

  private _notificarAbrirModalBuscarVisitante=new EventEmitter<any>();
  private _notificarCerrarModalBuscarVisitante=new EventEmitter<any>();

  private _notificarAbrirModalFinalizarVisita=new EventEmitter<any>();
  private _notificarCerrarModalFinalizarVisita=new EventEmitter<any>();

  private _notificarAbrirModalDetallePago=new EventEmitter<any>();
  private _notificarCerrarModalDetallePago=new EventEmitter<any>();

  private _notificarMascota=new EventEmitter<any>();
  private _notificarFamiliar=new EventEmitter<any>();
  private _notificarPropietarioDepartamento=new EventEmitter<any>();
  private _notificarAbrirModalPropietarioDepartamento=new EventEmitter<any>();


  get notificarAbrirModalFinalizarIncidente():EventEmitter<any>{
    return this._notificarAbrirModalFinalizarIncidente
  }
  get notificarCerrarModalFinalizarIncidente():EventEmitter<any>{
    return this._notificarCerrarModalFinalizarIncidente
  }


  get notificarAbrirModalDetallePago():EventEmitter<any>{
    return this._notificarAbrirModalDetallePago
  }
  get notificarCerrarModalDetallePago():EventEmitter<any>{
    return this._notificarCerrarModalDetallePago
  }


  get notificarAbrirModalFinalizarVisita():EventEmitter<any>{
    return this._notificarAbrirModalFinalizarVisita
  }
  get notificarCerrarModalFinalizarVisita():EventEmitter<any>{
    return this._notificarCerrarModalFinalizarVisita
  }

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

  
  abrirModalFinalizarIncidente(ps:EventoIncidente){
    this.switchModalFinalizarIncidente=true
    this._notificarAbrirModalFinalizarIncidente.emit(ps)
  }

  cerrarModalFinalizarIncidente(){
    this.switchModalFinalizarIncidente=false
    this._notificarCerrarModalFinalizarIncidente.emit()
  }


  abrirModalDetallePago(ps:PagoServicio){
    this.switchModalDetallePago=true
    this._notificarAbrirModalDetallePago.emit(ps)
  }

  cerrarModalDetallePago(){
    this.switchModalDetallePago=false
    this._notificarCerrarModalDetallePago.emit()
  }

  abrirModalFinalizarVisita(id:number){
    this.switchModalFinalizarVisita=true
    this._notificarAbrirModalFinalizarVisita.emit(id)
  }

  cerrarModalFinalizarVisita(){
    this.switchModalFinalizarVisita=false
    this._notificarCerrarModalFinalizarVisita.emit()
  }


  abrirModalBuscarVisitante(){
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
