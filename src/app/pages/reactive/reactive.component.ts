import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario()
    this.cargarDataAlFormulario()
    this.crearListeners()

  }

  ngOnInit(): void{
  }

  get pasatiempos(){
    return this.forma.get('pasatiempos') as FormArray
  }

  get nombreValido(){
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoValido(){
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoValido(){
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get usuarioNoValido(){
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  }

  get distritoValido(){
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadValido(){
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }

  get pass1NoValido(){
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }

  get pass2NoValido(){
    const pass1 = this.forma.get('pass1')?.value
    const pass2 = this.forma.get('pass2')?.value

    return (pass1 === pass2 ) ? false : true
  }

  crearFormulario(){
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['',[Validators.required, Validators.minLength(4), this.validadores.noHerrera]],
      correo: ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]],
      usuario: ['', , this.validadores.existeUsuario],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        distrito: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {
      validators: this.validadores.passwordsIguales('pass1', 'pass2')

    })
  }

  crearListeners(){
    this.forma.valueChanges.subscribe(valor => {
      console.log(valor);
    })

    this.forma.statusChanges.subscribe(status => {
      console.log({status});

    })

    this.forma.get('nombre')?.valueChanges.subscribe(console.log);

  }

  cargarDataAlFormulario(){

    this.forma.setValue({
      nombre: "Juan",
      apellido: "Perez",
      correo: "juan@jerez.com",
      usuario: '',
      pass1: '',
      pass2: '',
      direccion: {
        distrito: "Hokkaido",
        ciudad: "Otawa"
      },
      pasatiempos: []
    })

  }

  agregarPasatiempo(){
    this.pasatiempos.push(this.fb.control('', Validators.required))
  }

  borrarPasatiempo(i: number){
    this.pasatiempos.removeAt(i)
  }

  guardar(){
    console.log(this.forma);

    if (this.forma.invalid) {

      return Object.values(this.forma.controls).forEach( control => {

        if (control instanceof FormGroup) {

          Object.values(control.controls).forEach( control2 => {
            control2.markAsTouched()
          })

        } else {
          control.markAsTouched()
        }


      })



    }

    // Posteo de la Informacion

    this.forma.reset({
      nombre: 'Sin Nombre'
    });

  }

}
