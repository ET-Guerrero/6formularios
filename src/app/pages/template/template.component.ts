import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { PaisService } from '../../services/pais.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    pais: '',
    genero: 'M'

  }

  paises: any[] = []



  constructor(private paisService: PaisService) { }

  ngOnInit(): void {

    this.paisService.getPaises()
    .subscribe((paises: any) => {
      let resp = paises.map((pais:any) => {
        return {
          nombre: pais.name.common,
          codigo: pais.cca3
        }
      })

      this.paises = resp

      this.paises.unshift({
        nombre: '[ Seleccione Pais ]',
        codigo: ''
      })

      // console.log(this.paises);


    })

  }

  guardar(forma: NgForm){
    console.log(forma.value);

    if (forma.invalid) {

      Object.values(forma.controls).forEach( control => {
        control.markAsTouched()
      })

      return

    }

  }

}
