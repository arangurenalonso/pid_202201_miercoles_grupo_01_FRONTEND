import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'admin',loadChildren:() => import('./components/admin/admin.module').then(m=>m.AdminModule)},
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
