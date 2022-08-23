import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DetailClientComponent } from './components/detail-client/detail-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from './guards/auth-guard.guard';


const routes: Routes = [
  {
    path      : '',
    component : DashboardComponent,
    canActivate : [AuthGuardGuard]
  },
  {
    path      : 'login',
    component : LoginComponent
  },
  {
    path      : 'register',
    component : RegisterComponent
  },
  {
    path      : 'client/add',
    component : AddClientComponent,
    canActivate : [AuthGuardGuard]
  },
  {
    path      : 'client/edit/:id',
    component : EditClientComponent,
    canActivate : [AuthGuardGuard]
  },
  {
    path      : 'client/:id',
    component : DetailClientComponent,
    canActivate : [AuthGuardGuard]
  },
  {
    path      : '**',
    component : PageNotFoundComponent
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers : [AuthGuardGuard]
})
export class AppRoutingModule { }
