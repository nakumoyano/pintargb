import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { ErrorComponent } from './error/error.component';
import { LoginGuardian } from './login/login-guardian';
import { LoginComponent } from './login/login.component';
import { RolesGuard } from './login/roles.guard';
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
    canActivate: [LoginGuardian, RolesGuard],
  },
  {
    path: 'listado-empleados',
    component: EmployeeListComponent,
    canActivate: [LoginGuardian, RolesGuard],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
