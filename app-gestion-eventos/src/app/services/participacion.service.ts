import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipacionService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'A ocurrido un error inesperado!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage:
      ${error.message}`;
    }
    return throwError(errorMessage);
  }
   
  participarEvento(participacion: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/participacion/crear`,participacion).pipe(catchError(this.handleError));
  }

  obtenerParticipantes(idEvento: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/participacion/listarConfirmados/${idEvento}`).pipe(catchError(this.handleError));
  }

  confirmarAsistencia(idParticipacion: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/participacion/confirmarAsistencia/${idParticipacion}`, null).pipe(catchError(this.handleError));
  }

  getParticipa(idEvento: number, idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/participacion/participa/${idEvento}/${idUsuario}`).pipe(catchError(this.handleError));
  }

  obtenerEventosParticipados(idUsuario: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/participacion/eventosParticipados/${idUsuario}`).pipe(catchError(this.handleError));
  }
}
