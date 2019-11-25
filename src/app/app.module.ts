import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { InstrumentosComponent } from './component/instrumentos/instrumentos.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { InstrumentosService } from './service/instrumentos.service';
import { HttpClientModule } from '@angular/common/http';
import { InstrumentoComponent } from './component/instrumento/instrumento.component';
import { BuscadorComponent } from './component/buscador/buscador.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InstrumentosComponent,
    NavbarComponent,
    InstrumentoComponent,
    BuscadorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [InstrumentosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
