import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from '../paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    
    CommonModule,    
    FormsModule,
    RouterModule
  ],
  exports: [
    PaginatorComponent,
  ]
})
export class SharedModule { }
