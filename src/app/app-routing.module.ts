import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { InstrumentosComponent } from './component/instrumentos/instrumentos.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'instrumentos', component:InstrumentosComponent},
  //ruta comodin en caso de que no se encuentre la ruta
  {path:'**',pathMatch: 'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
