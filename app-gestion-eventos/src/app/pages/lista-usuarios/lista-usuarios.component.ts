import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParticipacionService } from '../../services/participacion.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-usuarios',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './lista-usuarios.component.html',
  styleUrl: './lista-usuarios.component.css'
})
export class ListaUsuariosComponent implements OnInit{
  idEvento!: number;
  asistentes: any[] = [];
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private participacionService: ParticipacionService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idEvento = +idParam;
      this.obtenerUsuariosAnotados();
    } else {
      console.error('El ID del evento no está presente en la ruta.');
    }
  }

  obtenerUsuariosAnotados(): void {
    this.cargando = true;
    this.participacionService.obtenerParticipantes(this.idEvento).subscribe(
      (asistentes) => {
        this.asistentes = asistentes;
        this.cargando = false;
        this.errorMensaje = '';
      },
      (error) => {
        console.error('Error al obtener los usuarios anotados:', error);
        this.errorMensaje = 'No se pudo obtener la lista de usuarios.';
        this.cargando = false;
      }
    );
  }

  confirmarAsistencia(idParticipacion: number): void {
    this.participacionService.confirmarAsistencia(idParticipacion).subscribe(
      (response) => {
        console.log('Asistencia confirmada.');
        this.obtenerUsuariosAnotados(); 
      },
      (error) => {
        console.error('Error al confirmar la asistencia:', error);
      }
    );
  }
}

