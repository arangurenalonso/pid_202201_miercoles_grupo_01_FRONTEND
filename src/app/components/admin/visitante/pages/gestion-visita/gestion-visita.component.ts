import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { Visita } from 'src/app/model/visita';
import { VisitaService } from 'src/app/services/visita.service';
import { Estado } from 'src/app/model/Estado';



@Component({
  selector: 'app-gestion-visita',
  templateUrl: './gestion-visita.component.html',
  styleUrls: ['./gestion-visita.component.scss']
})
export class GestionVisitaComponent implements OnInit {
  visitas: Visita[];

  public estados: Estado[] = [//{ id: 0, descripcion: 'Cancelada' }, 
                              //{ id: 1, descripcion: 'Programada' }, 
                              { id: 2, descripcion: 'En Proceso' }, 
                              { id: 3, descripcion: 'Finalizada' }]
  public paginator
  public pagSizeOption = [2, 3, 4, 5]
  public pageNumber = 0;
  public pageSize = 4;

  selectedEstado: number
  selected = new FormControl('valid', [Validators.required, Validators.pattern('[0-3]')]);


  public filtroNombre: string = '';
  public filtroDni: string = '';


  constructor(private visitaService: VisitaService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.selectedEstado = 2
    this.listarVisitas()

  }
  listarVisitas() {
    let filtroURL = `/page?numeroDePagina=${this.pageNumber}&pageSize=${this.pageSize}&sortBy=visPer.nombre&sortDir=asc&filtroNombre=${this.filtroNombre}&filtroDNI=${this.filtroDni}&estado=${this.selectedEstado}`

    console.log(filtroURL)
    this.visitaService.listarConFiltro(filtroURL)
      .subscribe(response => {
        console.log(response)
        this.paginator = response.detalle.data;
        this.visitas = response.detalle.data.contenido as Visita[];
      });
  }
  cambioEstado(e) {
    this.listarVisitas()
  }
  compareCategoryObjects(object1: any, object2: any) {
    /**
     * Function to compare the option values with the selected values. 
     * The first argument is a value from an option. 
     * The second is a value from the selection. A boolean should be returned.
     */
    console.log(object1)//El valor de cada mat-option
    console.log(object2)//El valor del  [(ngModel)] por defecto
    return object1 && object2 && object1 == object2;
}
 
  pageEvent(e: PageEvent) {
    this.pageSize = e.pageSize
    this.pageNumber = e.pageIndex
    this.listarVisitas()
  }
  buscarVisitaNombre() {
    this.pageNumber = 0
    this.filtroDni = ''
    this.listarVisitas()
  }
  buscarVisitaDNI() {
    this.pageNumber = 0
    this.filtroNombre = ''
    this.listarVisitas()
  }
} 
