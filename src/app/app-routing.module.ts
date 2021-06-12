import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { LoginComponent } from './pages/login/login.component';

// errors
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/entrar', pathMatch: 'full' },
  { path: 'entrar', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
