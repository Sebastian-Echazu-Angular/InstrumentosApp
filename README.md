# Proyecto con conexion a un archivo .php
Este es un ejemplo proyecto con node.js en angular. describiremos paso a paso como crear una app sencilla de angular que nos permita un manejo sencillo de datos que se encuentrar en el modulo de services

## 1 - Crear el Proyecto

Crear el proyecto de angular
```bash
ng new InstrumentosApp
```
si nos pregunga si queres agregar el modulo angular routing le indicamos que si
## 2 - Carpeta del proyecto

Nos transladamos a la carpeta del proyecto que acabos de crear.
```bash
cd InstrumentosApp
```
## 3 - Corremos el proyecto 

Corremos el proyecto de angular.

```bash
ng serve -o
```
## 4 - Creamos componentes

Creamos 2 compontes home y instrumentos. Colocamos todos los componentes en la carpeta componentes que se crea automaticamente cuando creamos el primer componente y anteponemos "component/"
```bash
ng g c component/home --spec false
ng g c component/instrumentos --spec false
```
## 5 - Creamos el navbar 

creamos el componente navbar pata poder navegar de una manera mas comoda dentro de la aplicacion.

```bash
ng g c component/shared/navbar --spec false
```
## 6 - Crear interface
creamos el interface con el modelo de datos. 
```bash
ng g i interface/androide 
```
## 7 - Modelo
En la interface de datos creamos nuestro modelo de datos para que pongamos utilizarlo en nuestro proyecto.
```typescript
export interface Instrumento {
    instrumento: string;
    marca: string;
    modelo: string;
    imagen: string;
    precio: string;
    costoEnvio: string;
    cantidadVendida: string;
    descripcion: string;
}
```
## 8 - Link de Boostrap
agregamos al index los links de bootstrap
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" 
integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous"> 
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
```
## 9 - Navbar
agregamos el siguiente codigo al html de navbar
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#"> <img src="assets/img/angular.png" 
	width="30" height="30" alt=""> </a> <button class="navbar-toggler" 
		type="button" data-toggle="collapse" data-target="#navbarSupportedContent" 
		aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> 
			<span class="navbar-toggler-icon"></span> </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item" routerLinkActive="active"> <a class="nav-link" [routerLink]="['home']">Home </a> </li>
            <li class="nav-item" routerLinkActive="active"> <a class="nav-link" [routerLink]="['instrumentos']">Instrumentos</a> </li>
        </ul>      
    </div>
</nav>
```
## 10 - Routing
agregamos al archivo del routing las rutas de nuestra app
```typescript
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
```
no olvidar importar los componentes

## 11 - Routing en html
agregamos al archivo appcomponent.html la estructura de la ruta
```html
<app-navbar></app-navbar>
<div class="container">
    <!--router-outlet asocia el presente archivo con mi configuración de rutas-->
    <router-outlet></router-outlet>
</div>
```
## 12 - Servicios
creamos un servicio para poder utilizarlo en nuestro proyecto
```bash
ng g s service/intrumentos --spec false
```
## 13 - Servicios
copiamos el archivo lista_intrumentos.php en "C:\xampp\htdocs\proyectos" para que podamos acceder a los datos de este archivo

## 14 - Datos de la app
agregamos al servicio el metodo para obtener del archivo de php la lista de instrumentos
```typescript
import { Injectable } from '@angular/core';
import { Instrumento } from '../interface/instrumento';
//importamos http client para poder administrar 
import { HttpClient } from '@angular/common/http';
//esto nos sirve para poder mapear el archivo json
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {

  private instrumentos: Instrumento[] = [];

  // Inyecta el HttpClient cuando se instancia el servicio
  constructor(private http: HttpClient) {}

  public getInstrumentosFromPhp(){
    console.log('getInstrumentosFromPhp');
    return this.http.get('http//localhost/proyectos/lista_intrumentos.php')
      .pipe(map((InstrumentosServe)=>{
        this.instrumentos = JSON.parse(JSON.stringify(InstrumentosServe));
        console.log(this.instrumentos);
        return this.instrumentos;
      }))
  }
}
```
## 15 - Logica de la información
en el archivo instrumentos.component.ts agregaremos el codigo nesesario y una inyeccion del servicio que nos proveera de los datos y metodos para ser mostrados
```typescript
import { Component, OnInit } from '@angular/core';
import { AndroidesService } from 'src/app/service/androides.service';

import { Router } from '@angular/router';
import { Androide } from 'src/app/interface/androide';

@Component({
  selector: 'app-androides',
  templateUrl: './androides.component.html',
  styleUrls: ['./androides.component.css']
})
export class AndroidesComponent implements OnInit {

  androides: Androide[] = [];

  constructor(private _androidesService:AndroidesService,private router:Router) { }

  ngOnInit() {
    this.androides= this._androideService.getAndroides();
    console.log(this.androides);
  }

  public verAndroide(idx:string){ this.router.navigate(['/androide', idx]) }

}
```
## 16 - Servicios
agregamos a nuestro archivo app.module.ts el servicio
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PersonasComponent } from './components/personas/personas.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
//importamos el servicio 
import { PersonasService } from './service/personas.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PersonasComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  //Agregamos el servicio a providers
  providers: [PersonasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## 17 -  Home
agregamos a home una plantilla de presentacion de nuestra app
```html
<div class="jumbotron jumbotron-fluid">
    <div class="container">
        <h1 class="display-4">Lista de Androides</h1>
        <p class="lead">Ejemplo de una app que muestra una lista de Androides</p>
    </div>
</div>
```
## 20 - Imagen de navbar
 agregamos a la carpeta assets/img el archivo angular.png

## Home
![captura de home](home.png)
## Androides
![captura de androides](androides.png)

# DETALLES



## 21 - Componente de detalles
agregamos un componente de detalles para poder detallar cada persona
```bash
ng g c components/androide --spec false
```
## 22 - Routing de detalles
agregamos al archivo de routing la pagina de detalles
```typescript
//importamos el componente persona
import { AndroideComponent } from './components/androide/androide.component';
//componente de persona asociado a un id
{ path: 'androide/:id',component:AndroideComponent},
```
## 23 Vista del componente Persona
agregamos el siguinte codigo a la pagina de androide .
``` html
<h1>Detalle de Androide </h1>
<hr>
<div class="row">
    <div class="col-md-4" style="text-align: center">
        <img [src]="androide.avatar" class="img-fluid" [alt]="androide.nombre"> <br><br>
        <a [routerLink]="['/androides']" class="btn btn-outline-danger btn-block">Regresar</a> </div>
    <div class="col-md-8">
        <h3 style="color: crimson">{{androide.nombre}}</h3>
        <h3 style="color: blue;"> {{androide.apellido | uppercase}}</h3>
        <hr>
        <p><b>Fabricacion:</b> {{androide.fechaFabricacion}}</p>
        <div> <img *ngIf="androide.amigo" src="assets/img/amistad.png" alt="Amistad"> </div>
    </div>
</div>
```
## 24 - Imagen Amistad
Agregamos a la carpeta assets/img el archivo amistad.png

## 25 - Logica de persona
Agrego al archivo personas.service.ts el metodo para mostrar equipo por id
``` typescript
public getAndroideXId(idx: number): Androide {
    for (let androide of this.androides) {
      if (androide.id == idx) {
        return androide;
      }
    }
  }
```
## 26 - Componente Androides

agregamos el metodo al componente de detalle para habilitar el boton de mostrar el quipo
``` typescript
public verPersona(idx: number) {
    this.router.navigate(['/persona', idx])
  }
```
## 27 - Logica Componente Androide

eliminamos el metodo oninit y instanciamos a nuestro service para obtener una persona
``` typescript
import { Component, OnInit } from '@angular/core';
import { Androide } from 'src/app/interface/androide';
import { ActivatedRoute } from '@angular/router';
import { AndroidesService } from 'src/app/service/androides.service';

@Component({
  selector: 'app-androide',
  templateUrl: './androide.component.html',
  styleUrls: ['./androide.component.css']
})
export class AndroideComponent {

  androide: Androide;

  constructor(private activatedRouted: ActivatedRoute, private _androidesService: AndroidesService) {
    this.activatedRouted.params.subscribe(params => {
      console.log(params['id'])
      this.androide = this._androidesService.getAndroideXId(params['id'])
    })
  }
}
```
# Pagina de Androide
![captura de androide](androide.png)

## 29 - Componente buscador
agregamos el componente buscador
``` bash
ng g c components/buscador --spec false
```
## agregamos al menu el boton de buscar

 <form class="form-inline my-2 my-lg-0"> <input class="form-control mr-sm-2" type="text" placeholder="Buscar Androide" #buscarTexto> <button (click) = "buscarAndroides(buscarTexto.value)" class="btn btn-outline-success my-2 my-sm-0" type="button">Buscar</button> 
        </form>

## 30 - Modificar Service
Agregamos el metodo en service para que el componente pueda recibir un termino y asociarlo a un elemento de la coleccion
```typescript
public buscarAndroide(termino: string):Androide[] {
    let androideArr: Androide[] = [];
    termino = termino.toLowerCase();
    for(let androide of this.androides){
      let apellido = androide.apellido.toLowerCase();
      if (apellido.indexOf(termino) >= 0) {
        androideArr.push(androide);
      }
    }
   return androideArr;
  }
```
## 31 - Logica de Buscador
agregamos el codigo para que podamos asociar al elemento buscador una logica
```typescript
import { Component, OnInit } from '@angular/core';
import { Androide } from 'src/app/interface/androide';
import { ActivatedRoute, Router } from '@angular/router';
import { AndroidesService } from 'src/app/service/androides.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  androides: Androide[] = [];
  termino : string;

  constructor(private activatedRoute:ActivatedRoute, private _androidesService:AndroidesService,private router:Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.termino = params['termino'];
      this.androides = this._androidesService.buscarAndroide(params['termino']);
    });
  }
  public verAndroide(idx:number){ this.router.navigate(['/androide', idx]) }

}
```
## - 32 Vista de Buscador
agregamos el codigo logico del buscador
``` typescript
<h1>Buscando: {{termino}} </h1>
<hr>
<div class="row" *ngIf="androides.length == 0">
    <div class="col-md-12">
        <div class="alert alert-info" role="alert"> No existen resultados con el termino: {{termino}} </div>
    </div>
</div>
<div class="card-columns">
    <div class="card animated fadeIn fast" *ngFor="let androideAux of androides; let i = index">
        <img class="card-img-top" src="{{androideAux.avatar}}" [alt]="androideAux">
        <div class="card-body">
            <h5 class="card-title">{{androideAux.nombre}}</h5>
            <p class="card-text">{{androideAux.apellido}}</p>
            <p class="card-text"> <small class="text-muted">{{androideAux.fechaFabricacion}}</small> </p>
            <button (click)="verAndroide(androideAux.id)" type="button" class="btn btn-outline-primary btn-block">Ver Mas</button>
        </div>
    </div>
</div>
```
## 33 - Modificamos el routing
agregamos al routing del buscador 
```typescript
import { BuscadorComponent } from './components/buscador/buscador.component';
//componente que nos permite buscar por nombre
{ path: 'buscar/:termino', component: BuscadorComponent },
```
## 34 - Modificamos Navbar
modificamos el componente de navbar para habilitar la accion de buscar
``` typescript
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  buscarAndroides(textoBusqueda: string) {
    this.router.navigate(['/buscar', textoBusqueda]);
  }
}
```
# Captura del Componente de busqueda

![captura de buscador](buscador.png)