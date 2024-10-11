import { Component, OnInit } from '@angular/core';
//NgAngular
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { LoginServiceService } from '../../../services/login.service.service';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [MenubarModule,],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent implements OnInit {

  items: MenuItem[] | undefined;

  constructor(private loginService:LoginServiceService) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Pagina de Inicio',
        icon: 'pi pi-home',
        routerLink: "/inicio"
      },
      {
        label: 'Agregar Usuario',
        icon: 'pi pi-user-plus',
        routerLink: '/datos/agregar'
      },
      {
        label: 'Datos',
        icon: 'pi pi-server',
        routerLink: '/datos'
      },
      {
        label: 'Cerrar',
        icon: 'pi pi-sign-out',
        command: () => this.cerrarSesion()
      }
    ]
  }

  cerrarSesion() {
    this.loginService.logout();
  }
}
