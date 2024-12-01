import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const rolesPermitidos = route.data['roles'] as Array<string>;

    if (!rolesPermitidos || rolesPermitidos.length === 0) {
      return true;
    }

    const rolUsuario = this.authService.obtenerRolUsuario();

    if (rolUsuario && rolesPermitidos.includes(rolUsuario)) {
      return true; 
    }

    this.router.navigate(['/login']);
    return false;
  }
}