import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseDirective } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RegisterService } from './services/register.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CollapseDirective,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AboutComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RegisterService, useClass: RegisterService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
