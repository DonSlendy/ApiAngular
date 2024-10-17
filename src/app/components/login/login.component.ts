import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

//PrimeNG
import { StyleClassModule } from 'primeng/styleclass';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';

import { LoginServiceService } from '../../services/login.service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [StyleClassModule, InputTextModule, RippleModule, ButtonModule, RouterLink, ReactiveFormsModule, MessagesModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent implements OnInit {


  constructor(
    private readonly formBuilder: FormBuilder,
    private loginService: LoginServiceService,
    private router: Router,
    private messagesService: MessageService
  ) { }

  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.formBuilder.group({
      user: [],
      password: [],
    });
  }

  submitUser(): void {
    if (this.loginForm.valid) {
      const datos = this.loginForm.value;
      //console.log("Los datos enviados fueron: " + datos["user"] + " " + datos["password"]);
      this.loginService.login(datos['user'], datos['password']).subscribe({
        next: () => {
          const rol = this.loginService.returnRol();
          switch (rol) {
            case "ROLE_ADMIN":
              console.log("Es un administrador");
              break;
            case "ROLE_USER":
              console.log("Es un usuario normal");
              break;
            default:
              console.log("No existe");
              break;
          }
          this.router.navigate(["/inicio"])
        },
        error: (err) => {
          console.error('Inicio fallido', err);
          this.messagesService.add({ severity: "error", summary: 'Fallo de sesión', detail: 'Credenciales incorrectas' });
        }
      })
    }
  }


}
