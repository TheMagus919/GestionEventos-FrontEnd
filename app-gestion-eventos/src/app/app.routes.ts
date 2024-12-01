import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NgModule } from '@angular/core';
import { VerEventoComponent } from './pages/ver-evento/ver-evento.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';
import { CrearEventoComponent } from './pages/crear-evento/crear-evento.component';
import { ListaUsuariosComponent } from './pages/lista-usuarios/lista-usuarios.component';
import { AuthGuard } from './guards/auth.guard';
import { CertificadosComponent } from './pages/certificados/certificados.component';

export const routes: Routes = [
    {   
        path:'login',
        component: LoginComponent
    },
    {
        path:'registro',
        component: RegisterComponent
    },
    {
        path:'evento/crear',
        component:CrearEventoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['organizador'] }
    },
    { 
        path: 'evento/:id', 
        component: VerEventoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['organizador','asistente'] }
    },
    { 
        path: 'evento/editar/:id', 
        component: EditarEventoComponent,
        canActivate: [AuthGuard],
        data: { roles: ['organizador'] }
    },
    {
        path:'eventos',
        component:EventosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['organizador','asistente'] }
    },
    {
        path:'lista-asistentes/:id',
        component:ListaUsuariosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['organizador'] }
    },
    {
        path:'inicio',
        component:InicioComponent
    },
    {
        path:'certificados',
        component:CertificadosComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })

  export class AppRoutingModule {}