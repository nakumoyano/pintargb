import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewClientsComponent } from './clients/new-clients/new-clients.component';
import { NewEmployeeComponent } from './employees/new-employee/new-employee.component';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './login/login.service';
import { LoginGuardian } from './login/login-guardian';
import { ErrorComponent } from './error/error.component';
import { NuevoProveedorComponent } from './proveedores/nuevo-proveedor/nuevo-proveedor.component';
import { ListaProveedoresComponent } from './proveedores/lista-proveedores/lista-proveedores.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NuevoProductoComponent } from './productos/nuevo-producto/nuevo-producto.component';
import { ListadoProductosComponent } from './productos/listado-productos/listado-productos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { DeleteComponent } from './clients/delete/delete.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { DeleteEmpleadoComponent } from './employees/delete-empleado/delete-empleado.component';
import { DeleteProveedorComponent } from './proveedores/delete-proveedor/delete-proveedor.component';
import { NuevaVentaComponent } from './ventas/nueva-venta/nueva-venta.component';
import { ListadoVentasComponent } from './ventas/listado-ventas/listado-ventas.component';
import { EliminarVentaComponent } from './ventas/eliminar-venta/eliminar-venta.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NewClientsComponent,
    NewEmployeeComponent,
    EmployeeListComponent,
    FooterComponent,
    ClientsListComponent,
    LoginComponent,
    ErrorComponent,
    NuevoProveedorComponent,
    ListaProveedoresComponent,
    NavbarComponent,
    NuevoProductoComponent,
    ListadoProductosComponent,
    EstadisticasComponent,
    DeleteComponent,
    AyudaComponent,
    DeleteEmpleadoComponent,
    DeleteProveedorComponent,
    NuevaVentaComponent,
    ListadoVentasComponent,
    EliminarVentaComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [LoginService, CookieService, LoginGuardian],
  bootstrap: [AppComponent],
})
export class AppModule {}
