import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstrumentosService } from 'src/app/service/instrumentos.service';
import { Instrumento } from 'src/app/interface/instrumento';

@Component({
  selector: 'app-instrumento',
  templateUrl: './instrumento.component.html',
  styleUrls: ['./instrumento.component.css']
})
export class InstrumentoComponent {

  instrumento: Instrumento;

  constructor(private activatedroute: ActivatedRoute, private _instrumentoService: InstrumentosService) {
    this.activatedroute.params.subscribe(params => {
      console.log(params['marca'])
      this.instrumento = _instrumentoService.getInstrumentoXMarca(params['marca']);
    })
  }
}
