import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventoService } from '../../services/evento.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './crear-evento.component.html',
  styleUrl: './crear-evento.component.css'
})
export class CrearEventoComponent implements OnInit{

  eventoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventoService: EventoService,
    private router: Router
  ) {

    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  crearEvento(): void {
    if (this.eventoForm.valid) {
      const nuevoEvento = this.eventoForm.value;
      this.eventoService.postEvento(nuevoEvento).subscribe(
        (response) => {
          console.log('Evento creado con éxito');
          this.router.navigate(['/eventos']);
        },
        (error) => {
          console.error('Error al crear el evento:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
