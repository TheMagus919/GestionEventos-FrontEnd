import { Component,OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EventoService } from '../../services/evento.service';
import { DatePipe } from '@angular/common';
import { FechasPipe } from '../../pipes/fechas.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink,RouterOutlet,RouterLinkActive, CommonModule, FechasPipe],
  providers:[DatePipe],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  eventos: any[] = [];
  evento: any;
  rol: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private eventoService: EventoService, private authService:AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.obtenerRol();
    });
    if(this.rol =="organizador"){
      this.eventoService.getTodosEventos().subscribe(
        (data) => {
          this.eventos = data;
          console.log('Eventos obtenidos:', this.eventos);
        },
        (error) => {
          console.error('Error al obtener los eventos:', error);
        }
      );
    }else if(this.rol =="asistente"){
      this.eventoService.getEventos().subscribe(
        (data) => {
          this.eventos = data;
          console.log('Eventos obtenidos:', this.eventos);
        },
        (error) => {
          console.error('Error al obtener los eventos:', error);
        }
      );
    }else{
      console.error('No posees permisos');
    }
    
  }

  obtenerRol(): void {
    this.rol = this.authService.obtenerRolUsuario();
  }
  
  EliminarEvento(idEvento: number): void {
    const confirmacion = confirm(`¿Estás seguro de eliminar el evento con ID ${idEvento}?`);
    if (confirmacion) {
      this.eventoService.deleteEvento(idEvento).subscribe(
        (data) => {
          console.log('Evento con ID ${idEvento} eliminado.');
          location.reload();
        },
        (error) => {
          console.error('Error al eliminar evento:', error);
        }
      );
      alert(`Evento con ID ${idEvento} eliminado.`);
    }
  }
}
