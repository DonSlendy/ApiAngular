import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private API_URL: string = "";
  //http://localhost:8080/api/peti

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem("authToken");
    if (localStorage.getItem("authRol") == "ROLE_ADMIN") {
      this.API_URL = "http://localhost:8080/api/admin";
    } else {
      this.API_URL = "http://localhost:8080/api/peti";
    }
    console.log(this.API_URL);
    return new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
  }

  getDatos(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API_URL + "/getUsers", { headers }).pipe(res => res);
  }

  postDatos(datos: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(this.API_URL + "/postUser", datos, { headers })
  }

  deleteDatos(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.delete(this.API_URL + "/deleteUser/" + id, { headers, responseType: 'text' });
  }

  getDatoById(id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(this.API_URL + "/getUser/" + id, { headers });
  }

  putDatos(datos: any, id: number): Observable<any> {
    const headers = this.getHeaders();
    return this.http.put(this.API_URL + "/modifyUser/" + id, datos, { headers })
  }
}
