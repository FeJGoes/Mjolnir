import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/errors/page-not-found/page-not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { ClientesTableComponent } from './pages/clientes/clientes-table/clientes-table.component';
import { ClienteFormComponent } from './pages/clientes/cliente-form/cliente-form.component';
import { ClientePasswordFormComponent } from './pages/clientes/cliente-password-form/cliente-password-form.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'registrar', component: ClienteFormComponent },
  { path: 'clientes/cadastrar', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesTableComponent, canActivate: [AuthGuard] },
  { path: 'clientes/:id/editar', component: ClienteFormComponent, canActivate: [AuthGuard] },
  { path: 'clientes/:id/troca-senha', component: ClientePasswordFormComponent, canActivate: [AuthGuard] },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
