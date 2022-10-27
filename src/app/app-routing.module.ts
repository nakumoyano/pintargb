import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { ErrorComponent } from './error/error.component';
import { LoginGuardian } from './login/login-guardian';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'nuevo-cliente',
    component: NewClientsComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-clientes',
    component: ClientsListComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nuevo-empleado',
    component: NewEmployeeComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-empleados',
    component: EmployeeListComponent,
    canActivate: [LoginGuardian],
  },
  // {path:"dashboard",component: DashboardComponent}
  // { path: 'home', component: SidebarComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
