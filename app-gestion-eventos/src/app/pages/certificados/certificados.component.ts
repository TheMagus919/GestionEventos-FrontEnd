import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ParticipacionService } from '../../services/participacion.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-certificados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.css'
})
export class CertificadosComponent implements OnInit{
  idEvento!: number;
  eventos: any[] = [];
  errorMensaje: string = '';
  cargando: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private participacionService: ParticipacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
      this.obtenerEventos();
  }

  obtenerEventos(): void {
    this.cargando = true;
    const idUsuario = this.authService.obtenerIdUsuario();
    if(idUsuario != null){
      this.participacionService.obtenerEventosParticipados(parseInt(idUsuario)).subscribe(
        (eventos) => {
          this.eventos = eventos;
          this.cargando = false;
          this.errorMensaje = '';
        },
        (error) => {
          console.error('Error al obtener los eventos en los que participo:', error);
          this.errorMensaje = 'No se pudo obtener la lista de eventos.';
          this.cargando = false;
        }
      );
    }else{
      console.error('No se obtuvo usuario.');
    }
    
  }

  descargarCertificado(nombre:string){
    alert('Certificado de que asistio al evento de '+nombre+' descargado con exito.');
  }
}
