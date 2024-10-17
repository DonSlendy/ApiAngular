import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

//PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';

//Encriptador
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-formulario-nuevo-usuario',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './formulario-nuevo-usuario.component.html',
  styleUrl: './formulario-nuevo-usuario.component.css',
})
export class FormularioNuevoUsuarioComponent implements OnInit {

  newUserForm!: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.newUserForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      user: [],
      password: [],
      email: []
    })
  }

  newUser(): void {
    const datos = this.newUserForm.value;
    datos["password"] = bcrypt.hashSync(datos["password"], 10);
    console.log(datos);
  }

}
