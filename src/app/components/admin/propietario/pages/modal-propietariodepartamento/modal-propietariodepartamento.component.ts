import { Component, Input, OnInit } from '@angular/core';
import { PropietarioDepartamentoDTO } from 'src/app/dto/PropietarioDepartamentoDTO';
import { Departamento } from 'src/app/model/departamento';
import { Propietario } from 'src/app/model/propietario';
import { PropietarioDepartamento } from 'src/app/model/propietarioDepartamento';
import { DepartamentoService } from 'src/app/services/departamentoservice';
import { ModalService } from 'src/app/services/modal.service';
import { PropietarioDepartamentoService } from 'src/app/services/propietarioDepartamentoservice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-propietariodepartamento',
  templateUrl: './modal-propietariodepartamento.component.html',
  styleUrls: ['./modal-propietariodepartamento.component.scss']
})
export class ModalPropietariodepartamentoComponent implements OnInit {

  @Input() propietariodepartamento: PropietarioDepartamento[]=[]
  @Input() propietario: Propietario
  departamentosNoSeleccionados: Departamento[]=[]
  departamentosSeleccionados:Departamento[]=[]
  
  departamentosListaTotalBD: Departamento[];
  departamentosSeleccionadosBD:Departamento[]=[]
  departamentosNoSeleccionadosBD:Departamento[]=[]
  public errores: any
  titulo: string = "Propietario Departamento"


  constructor(
    private departamentoService: DepartamentoService,
    public modalService: ModalService,
    private propietarioDepartamentoService:PropietarioDepartamentoService) { }

  ngOnInit(): void {
    // this.agregarDepartamentosSeleccionados()
    // this.listarDepartamentos()
    this.escucharAperturaMoral()
    
  }
  escucharAperturaMoral(){
    this.modalService.notificarAbrirModalPropietarioService.subscribe(()=>{
      this.agregarDepartamentosSeleccionados()
      this.listarDepartamentos()
    })
  }
  agregarDepartamentosSeleccionados(){
    let departamentosSeleccionadosBD=[]
    let departamentosSeleccionados=[]
    this.propietariodepartamento.forEach(x=>{
      if(x.estado){
        departamentosSeleccionadosBD.push(x.departamento)
        departamentosSeleccionados.push(x.departamento)
      }     
    })
    this.departamentosSeleccionadosBD=departamentosSeleccionadosBD
    this.departamentosSeleccionados=departamentosSeleccionados
  }
  listarDepartamentos() {
    this.departamentoService.getAllDepartamento()
      .subscribe(response => {
       this.departamentosListaTotalBD=response as Departamento[]
        this.cargarInformacion()
      });
  }
  cargarInformacion() {
    let obtenerDepartamentosNoSeleccionadosDesdeBD=this.departamentosListaTotalBD.filter(x=>{
       let res = this.departamentosSeleccionados.find((y)=>{
        return y.id == x.id ;
        });
     return res == undefined;
     });
     this.departamentosNoSeleccionados=obtenerDepartamentosNoSeleccionadosDesdeBD
     this.departamentosNoSeleccionadosBD=obtenerDepartamentosNoSeleccionadosDesdeBD
  }

  public cerrarModal(){
    this.modalService.cerrarPropietarioDepartamentoModal()
    this.errores = null
  }

  public agregarDepartamento(dep :Departamento){

    this.departamentosSeleccionados.push(dep)
    this.departamentosSeleccionados.sort((x, y) => x.id - y.id)
    this.departamentosNoSeleccionados=this.filtrarDosArray(this.departamentosListaTotalBD,this.departamentosSeleccionados)
    
  }
  public desAgregarDepartamento(dep:Departamento){
    this.departamentosSeleccionados = this.departamentosSeleccionados.filter(x => x.id != dep.id)
    this.departamentosSeleccionados.sort((x, y) => x.id - y.id)
    this.departamentosNoSeleccionados=this.filtrarDosArray(this.departamentosListaTotalBD,this.departamentosSeleccionados)
  }

  filtrarDosArray(arrayA:any[],arrayB:any[]):any[] {
    let arrayReturn=arrayA.filter(x=>{
        let res = arrayB.find((y)=>{
         return y.id == x.id;
         });
      return res == undefined;
      });
      return arrayReturn;
   }
  
  public update(){

    let  obj=new PropietarioDepartamentoDTO()   
    obj.departamentosCrear=this.filtrarDosArray(this.departamentosSeleccionados , this.departamentosSeleccionadosBD)
    obj.departamentosDesactivar=this.filtrarDosArray(this.departamentosNoSeleccionados , this.departamentosNoSeleccionadosBD)
    this.propietarioDepartamentoService.actualizarDepartamentosPropietario(this.propietario.id,obj).subscribe
    (response => {
      console.log("RESULTADO EXITOSO")
      console.log(response)
      this.modalService.notificarPropietarioDepartamento.emit();
      Swal.fire({
        icon: 'success',
        title: "Actualización correcta!!",
        text: `Los departamentos han sido actualizado`,
      })
      this.cerrarModal()

    },
      err => {
        console.log("RESULTADO FALLIDO")
        console.log(err)
        // let respuesta: Respuesta = err.error
        // this.errores = respuesta.detalle.data
      }
    )
  }
} 
