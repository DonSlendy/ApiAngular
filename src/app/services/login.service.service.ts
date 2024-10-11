import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private localStorage: any;

  private urlLogin = "http://localhost:8080/api/auth/login";
  private urlRefresh = "http://localhost:8080/api/auth/refresh";

  private token = 'authToken';
  private tokenRefresh = 'refreshToken';

  constructor(private httpClient: HttpClient, private route: Router) { }

  login(firstname: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.urlLogin, { firstname, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.setTokenRefresh(response.refreshToken);
          this.autoRefreshToken();
        }
      })
    )
  }

  refreshToken(): Observable<any> {
    const refreshToken = this.getTokenRefresh();
    return this.httpClient.post<any>(this.urlRefresh, { refreshToken }).pipe(
      tap(response => {
        if (response.token && response.rol) {
          this.setToken(response.token);
          this.setTokenRefresh(response.refreshToken);
          this.autoRefreshToken();
        }
      })
    )
  }

  private setToken(tokenVar: string): void {
    localStorage.setItem(this.token, tokenVar);
  }

  private getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.token);
    } else {
      return null;
    }
  }

  private setTokenRefresh(tokenRefreshVar: string): void {
    localStorage.setItem(this.tokenRefresh, tokenRefreshVar);
  }

  private getTokenRefresh(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenRefresh);
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = payload.exp * 1000;
    return Date.now() < expired;
  }

  autoRefreshToken(): void {
    const token = this.getToken();
    if (!token) {
      return;
    }
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expired = payload.exp * 1000;

    const timeout = expired - Date.now() - (60 * 1000);

    setTimeout(() => { this.refreshToken().subscribe() }, timeout);
  }

  logout(): void {
    localStorage.removeItem(this.token);
    localStorage.removeItem(this.tokenRefresh);
    this.route.navigate(["/login"]);
  }

}
