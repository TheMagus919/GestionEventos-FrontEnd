import { Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'token';
  private baseUrl = 'http://localhost:3000';
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
  private rolSubject = new BehaviorSubject<string | null>(null);
  rol$ = this.rolSubject.asObservable();

  constructor(private http: HttpClient) {
  }

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

  guardarToken(token: string): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  eliminarToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  decodificarTokenManual(token: string): any {
    if (!token) return null;
  
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error al decodificar el token manualmente:', error);
      return null;
    }
  }
  decodificarToken(): any {
    const token = this.obtenerToken();
    if (!token) return null;
  
    return this.decodificarTokenManual(token);
  }

  obtenerRolUsuario(): string | null {
    const decoded = this.decodificarToken();
    return decoded?.rol || null;
  }

  obtenerIdUsuario(): string | null {
    const decoded = this.decodificarToken();
    return decoded?.id || null;
  }

  tieneRol(roles: string[]): boolean {
    const userRol = this.obtenerRolUsuario();
    if (userRol !== null) {
      return roles.includes(userRol);
    } else {
      return false;
    }
    
  }

  registro(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario/registro`, usuario).pipe(catchError(this.handleError));
  }

  login(credenciales: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/usuario/login`, credenciales).pipe(
      tap((response) => {
        if (response && response.token) {
          this.guardarToken(response.token);
          this.loginEstado();
        }
      }),
      catchError(this.handleError)
    );
  }

  loginEstado(): void {
    this.isLoggedInSubject.next(true);
    this.rolSubject.next(this.obtenerRolUsuario()); 
  }
    
  logout(): void {
    this.isLoggedInSubject.next(false);
    this.eliminarToken();
    this.rolSubject.next(null);  
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }
  
  estaAutenticado(): boolean {
    const token = this.obtenerToken();
    if (!token) return false;

    try {
      const decoded = this.decodificarToken();
      return !!decoded;
    } catch {
      return false;
    }
  }
}