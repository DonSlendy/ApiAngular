import { Routes } from '@angular/router';
import { DatosComponent } from './components/datos/datos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormularioUsuarioComponent } from './components/formulario-usuario/formulario-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: "login", component: LoginComponent },
    { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
    { path: 'datos/agregar', component: FormularioUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'datos/modifi/:id', component: FormularioUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'datos', component: DatosComponent, canActivate: [AuthGuard] },
];
