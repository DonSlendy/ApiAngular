import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../services/datos.service';
import { DatosInterface } from '../../interfaces/datos.interface';
import { RouterLink } from '@angular/router';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { NavbarComponentComponent } from '../PrimeNG_Components/navbar-component/navbar-component.component';

@Component({
  selector: 'app-datos',
  standalone: true,
  imports: [ButtonModule, RouterLink, MessagesModule, NavbarComponentComponent],
  templateUrl: './datos.component.html',
  styleUrl: './datos.component.css'
})
export class DatosComponent implements OnInit {

  datosList: DatosInterface[] = [];

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.getDatos();
  }

  getDatos() {
    this.datosService.getDatos().subscribe({
      next: (result) => {
        this.datosList = result;
      },
      error: (err) => {
        console.log("Erroor", err);
      }
    })
  }

  delete(datos: DatosInterface): void {
    this.datosService.deleteDatos(datos.id).subscribe(
      response => {
        console.log('Datos eliminados correctamente:', response);
        // Actualizar la lista de datos en la UI
        this.datosList = this.datosList.filter(item => item.id !== datos.id);
      },
      error => {
        console.error('Error al eliminar los datos:', error);
      }
    );
  }
}
