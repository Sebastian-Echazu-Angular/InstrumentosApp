import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { InstrumentosComponent } from './component/instrumentos/instrumentos.component';
import { InstrumentoComponent } from './component/instrumento/instrumento.component';
import { BuscadorComponent } from './component/buscador/buscador.component';


const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'instrumentos', component:InstrumentosComponent},
  {path: 'instrumento/:marca',component:InstrumentoComponent},
  {path: 'buscar/:termino',component:BuscadorComponent},
  //ruta comodin en caso de que no se encuentre la ruta
  {path:'**',pathMatch: 'full',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
