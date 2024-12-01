import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements  OnInit{
  rol: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.obtenerRol();
    });
  }

  obtenerRol(): void {
    this.rol = this.authService.obtenerRolUsuario();
  }

  logout(): void {
    this.authService.logout();
    this.rol = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

  login(): void {
    this.router.navigate(['/login']);
  }
  
  registro(): void {
    this.router.navigate(['/registro']);
  }
}
