import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EventoService } from '../../services/evento.service';
import { CommonModule } from '@angular/common';
import { ParticipacionService } from '../../services/participacion.service';
import { DatePipe } from '@angular/common';
import { FechasPipe } from '../../pipes/fechas.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ver-evento',
  standalone: true,
  imports: [RouterLink, CommonModule, FechasPipe],
  providers:[DatePipe],
  templateUrl: './ver-evento.component.html',
  styleUrl: './ver-evento.component.css'
})
export class VerEventoComponent implements OnInit{
  evento: any;
  participa: boolean = false;
  rol: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private eventoService: EventoService,
    private authService: AuthService,
    private participacionService: ParticipacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.obtenerRol();
    });

    const idEvento = +this.route.snapshot.paramMap.get('id')!;
    this.cargarEvento(idEvento);
    this.participaEvento(idEvento);
  }

  obtenerRol(): void {
    this.rol = this.authService.obtenerRolUsuario();
  }
  
  participaEvento(id: number): void {
    const idUsuario = this.authService.obtenerIdUsuario();
    if(idUsuario != null){
      this.participacionService.getParticipa(id, parseInt(idUsuario)).subscribe(
        (data) => {
          if(data[0].idEvento != null){
            this.participa = true;
          }else{
            this.participa = false;
          }
          
        },
        (error) => {
          console.error('Error al obtener participacion:', error);
        }
      );
    }
  }

  cargarEvento(id: number): void {
    this.eventoService.getEvento(id).subscribe(
      (data) => {
        this.evento = data[0];
      },
      (error) => {
        console.error('Error al cargar el evento:', error);
      }
    );
  }

  asistir(id: number): void {
    const idUsuario = this.authService.obtenerIdUsuario();
    var participacion = {"idUsuario":idUsuario, "idEvento":id, "confirmacion":0}
    this.participacionService.participarEvento(participacion).subscribe(
      (data) => {
        console.error('Participaras en este Evento');
        this.router.navigate(['/eventos']);
      },
      (error) => {
        console.error('Error al cargar el evento:', error);
      }
    );
  }
}
