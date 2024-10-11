import { Component } from '@angular/core';
import { GalleryComponentComponent } from '../PrimeNG_Components/gallery-component/gallery-component.component';
import { UsuarioInterface } from '../../interfaces/usuario.interface';
import { FormsModule } from '@angular/forms';

import { NavbarComponentComponent } from '../PrimeNG_Components/navbar-component/navbar-component.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [GalleryComponentComponent, FormsModule, NavbarComponentComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  usuario: UsuarioInterface = {
    nombre: "'tu nombre'",
    edad: 5,
    password: "secretPass",
  }
}
