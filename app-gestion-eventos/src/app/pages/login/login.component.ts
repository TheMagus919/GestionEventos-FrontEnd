import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.authService.login(credentials).subscribe(
        (response) => {
          console.log('Login exitoso:', response);

          this.authService.guardarToken(response.token);

          alert('Inicio de sesión exitoso');
          this.router.navigate(['/inicio']);
          this.authService.loginEstado();
        },
        (error) => {
          if (error.status == 401) {
            this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
          } else if (error.status == 404){
            this.errorMessage = 'Hubo un error. Intenta más tarde.';
          }else{
            this.errorMessage = 'Usuario o contraseña incorrectas.';
          }
        }
      );
    } else {
      this.errorMessage = 'Por favor, completa los campos correctamente.';
    }
  }
}