import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-evento',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './editar-evento.component.html',
  styleUrl: './editar-evento.component.css'
})

export class EditarEventoComponent implements OnInit{
  evento: any;
  eventoForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventoService: EventoService,
    private fb: FormBuilder
  ) {
    this.eventoForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const idEvento = +this.route.snapshot.paramMap.get('id')!;
    this.cargarEvento(idEvento);
  }

  cargarEvento(id: number): void {
    this.eventoService.getEvento(id).subscribe(
      (data) => {
        this.evento = data[0];  
        this.eventoForm.patchValue(this.evento);  
      },
      (error) => {
        console.error('Error al cargar el evento:', error);
      }
    );
  }

  guardarEvento(): void {
    if (this.eventoForm.valid) {
      const eventoActualizado = this.eventoForm.value;
      this.eventoService.putEvento(this.evento.idEvento, eventoActualizado).subscribe(
        () => {
          console.log('Evento actualizado con éxito');
          this.router.navigate(['/eventos']); 
        },
        (error) => {
          console.error('Error al actualizar el evento:', error);
        }
      );
    }
  }
}
