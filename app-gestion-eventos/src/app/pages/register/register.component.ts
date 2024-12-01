import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registroForm: FormGroup;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {

    this.registroForm = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(4)]],
        apellido: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmarPassword: ['', [Validators.required]],
        domicilio: ['', [Validators.required]],
        rol: ['', [Validators.required]],
      },
      {
        validators: this.checkPasswords,
      }
    );
  }

  ngOnInit(): void {}

  checkPasswords(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmarPassword = group.get('confirmarPassword')?.value;
    return password === confirmarPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const { confirmarPassword, ...usuario } = this.registroForm.value;

      this.authService.registro(usuario).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado exitosamente');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);
          this.mensajeError = 'Error al registrar el usuario. Intente nuevamente.';
        }
      );
    } else {
      console.error('Formulario no válido');
      this.mensajeError = 'Por favor, complete todos los campos correctamente.';
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registroForm.controls;
  }
}