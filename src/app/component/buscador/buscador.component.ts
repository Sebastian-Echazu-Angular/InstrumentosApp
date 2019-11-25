import { Component, OnInit } from '@angular/core';
import { Instrumento } from 'src/app/interface/instrumento';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentosService } from 'src/app/service/instrumentos.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  instrumentos : Instrumento[]=[];
  termino : string;

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private _instrumentoService:InstrumentosService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      this.termino = params['termino'];
      this.instrumentos = this._instrumentoService.buscarInstrumentos(params['termino']);
    })
  }

  public verInstrumento(ins:string){ this.router.navigate(['/instrumento', ins]) }
}
