import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginServiceService } from './services/login.service.service';

// Componentes de PrimeNG


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // Usa CommonModule para las directivas como NgIf y NgFor
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private loginService: LoginServiceService) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.loginService.autoRefreshToken();
    }
  }

}
