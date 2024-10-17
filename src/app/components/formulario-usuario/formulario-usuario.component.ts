import { CommonModule, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import { ActivatedRoute, Router } from '@angular/router';


//Validaciones
import { FormValidator } from './form-usuario.validator';
//AngularNG
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { NavbarComponentComponent } from '../PrimeNG_Components/navbar-component/navbar-component.component';

import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-formulario-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    MessagesModule,
    NavbarComponentComponent
  ],
  providers: [MessageService],
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css'],
})



export class FormularioUsuarioComponent implements OnInit {

  contactForm!: FormGroup;
  animations?: any[]
  mensaje = "";
  booleanMensaje;

  constructor(
    private readonly fb: FormBuilder,
    private datosService: DatosService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private messagesService: MessageService) {

    if (this.router.url.includes("agregar")) {
      this.mensaje = "agregar";
      this.booleanMensaje = true;

    } else {
      this.mensaje = "modificar";
      this.booleanMensaje = false;
    }
  }

  ngOnInit(): void {
    this.contactForm = this.initForm();
    this.errorComponenteGlobal();
    this.getDatoById();
  }

  initForm(): FormGroup {
    return this.fb.group({
      id: [""],
      firstname: ['', [Validators.required, Validators.minLength(10)]],
      lastName: ['', [Validators.required, Validators.pattern(/^(?!.* {2}).*$/)]],
      password: [''],
      email: ['', [Validators.required, Validators.email]],
      rol: ['']
    });
  }

  errorComponenteGlobal() {
    Object.keys(this.contactForm.controls).forEach(controlName => {
      const control = this.contactForm.get(controlName);

      control?.statusChanges.subscribe(status => {
        if (status === 'INVALID') {
          control.markAsTouched();
        }
      });
    });
  }

  getErrorMessage(controlName: string): string | null {
    const control = this.contactForm.get(controlName);
    if (control?.touched && control?.errors) {
      return FormValidator.getErrorMessage(controlName, control.errors);
    }
    return null;
  }

  onSubmitNew() {
    if (this.contactForm.valid) {
      const datos = this.contactForm.value;
      this.datosService.postDatos(datos).subscribe(
        response => {
          this.messagesService.add({ severity: "success", summary: 'Agregado', detail: 'La persona: ' + datos['firstname'] + ' fue agregada' });
          this.contactForm.reset();
          this.contactForm.markAsUntouched();
        },
        error => {
          this.messagesService.add({ severity: "error", summary: 'Error al agregar', detail: 'Hubo un error' });
        }
      );
    }
  }

  onSubmitModifi() {
    if (this.contactForm.valid) {
      const datos = this.contactForm.value;
      this.datosService.putDatos(datos, datos['id']).subscribe(
        response => {
          this.messagesService.add({ severity: "info", summary: 'Modificado', detail: 'Modificación exitosa' });

        },
        error => {
          this.messagesService.add({ severity: "error", summary: 'Error de modificación', detail: 'Hubo un error' });
        }
      )
    }
  }

  getDatoById(): void {
    this.activateRoute.params.subscribe(
      e => {
        let id = e['id'];
        if (id) {
          this.datosService.getDatoById(id).subscribe(
            es => {
              this.contactForm.patchValue({
                id: es.id,
                firstname: es.firstname,
                lastName: es.lastName,
                email: es.email,
              });
            });
        }
      });
  }
}  