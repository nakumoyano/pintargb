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
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';

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
    Component1Component,
    Component2Component,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [LoginService, CookieService, LoginGuardian],
  bootstrap: [AppComponent],
})
export class AppModule {}
