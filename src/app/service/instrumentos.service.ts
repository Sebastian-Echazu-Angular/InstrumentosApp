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
