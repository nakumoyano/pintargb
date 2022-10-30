import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { ErrorComponent } from './error/error.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { LoginGuardian } from './login/login-guardian';
import { LoginComponent } from './login/login.component';
import { RolesGuard } from './login/roles.guard';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto.component';
import { ListaProveedoresComponent } from './proveedores/lista-proveedores/lista-proveedores.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'estadisticas',
    component: EstadisticasComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nuevo-cliente',
    component: NewClientsComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nuevo-cliente/:id',
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
  {
    path: 'nuevo-proveedor',
    component: NuevoProveedorComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-proveedores',
    component: ListaProveedoresComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nuevo-producto',
    component: NuevoProductoComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-productos',
    component: ListadoProductosComponent,
    canActivate: [LoginGuardian],
  },
  { path: 'ayuda', component: AyudaComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
