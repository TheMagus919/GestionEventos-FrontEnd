import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
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

  getEventos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/evento/listarEventosPorFecha`).pipe(catchError(this.handleError));
  }

  getTodosEventos(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/evento/buscarTodos`).pipe(catchError(this.handleError));
  }

  getEvento(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/evento/buscarEvento/${id}`).pipe(catchError(this.handleError));
  }

  postEvento(evento:any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/evento/crear`,evento).pipe(catchError(this.handleError));
  }

  putEvento(id: number, evento:any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/evento/editar/${id}`,evento).pipe(catchError(this.handleError));
  }

  deleteEvento(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/evento/eliminar/${id}`).pipe(catchError(this.handleError));
  }

}