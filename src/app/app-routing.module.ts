import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AyudaComponent } from './ayuda/ayuda.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { ComprasPorHacerComponent } from './compras/compras-por-hacer/compras-por-hacer.component';
import { NuevaCompraComponent } from './compras/nueva-compra/nueva-compra.component';
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
import { ListadoVentasComponent } from './ventas/listado-ventas/listado-ventas.component';
import { NuevaVentaComponent } from './ventas/nueva-venta/nueva-venta.component';

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
    path: 'nuevo-empleado/:id',
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
    path: 'nuevo-proveedor/:id',
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
    path: 'nuevo-producto/:id',
    component: NuevoProductoComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-productos',
    component: ListadoProductosComponent,
    canActivate: [LoginGuardian],
  },
  { path: 'ayuda', component: AyudaComponent, canActivate: [LoginGuardian] },
  {
    path: 'nueva-venta',
    component: NuevaVentaComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nueva-venta/:id',
    component: NuevaVentaComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'listado-ventas',
    component: ListadoVentasComponent,
    canActivate: [LoginGuardian],
  },
  {
    path: 'nueva-compra',
    component: NuevaCompraComponent,
  },
  {
    path: 'nueva-compra/:id',
    component: NuevaCompraComponent,
  },
  {
    path: 'compras-por-hacer',
    component: ComprasPorHacerComponent,
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
