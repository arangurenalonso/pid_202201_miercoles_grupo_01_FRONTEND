import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginator-nav',
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit, OnChanges {

  @Input() paginador_hijo: any;
  @Input() componente_name_padre: any;
  
  paginas: number[];

  desde: number;
  hasta: number;

  urlToRedirect:String;

  constructor() { }

  ngOnInit() {
    this.urlToRedirect=`/admin/${this.componente_name_padre}/listado/page`
    this.initPaginator();
  }

  ngOnChanges(changes: SimpleChanges) {
    let paginadorActualizado = changes['paginador_hijo'];
    if (paginadorActualizado.previousValue) {
      this.initPaginator();
    }

  }

  private initPaginator(): void {
    this.desde = Math.min(Math.max(1, this.paginador_hijo.numeroDePagina - 4), this.paginador_hijo.totalPaginas - 5);
    this.hasta = Math.max(Math.min(this.paginador_hijo.totalPaginas, this.paginador_hijo.numeroDePagina + 4), 6);

    if (this.paginador_hijo.totalPaginas > 5) {
      this.paginas = new Array(this.hasta - this.desde + 1).fill(0).map((_valor, indice) => indice + this.desde);
    } else {
      this.paginas = new Array(this.paginador_hijo.totalPages).fill(0).map((_valor, indice) => indice + 1);
    }
  }

}
