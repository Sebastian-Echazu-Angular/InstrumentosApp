import { Component, OnInit } from '@angular/core';
import { InstrumentosService } from 'src/app/service/instrumentos.service';
import { Router } from '@angular/router';
import { Instrumento } from 'src/app/interface/instrumento';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.css']
})
export class InstrumentosComponent implements OnInit {

  instrumentos : Instrumento[] = [];
  constructor(private _intrumentosService: InstrumentosService, private router: Router) { }

  ngOnInit() {
     this._intrumentosService.getInstrumentosFromPhp().subscribe(res =>{this.instrumentos = res});
  }
  
  public DetalleInstrumento(ins:string){ this.router.navigate(['/instrumento', ins]) }
  
}
