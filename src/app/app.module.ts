import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CollapseDirective } from 'ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { MomentModule } from 'angular2-moment';
import { TooltipModule } from 'ng2-bootstrap';

import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { InfoService } from './services/info.service';
import { ProfileService } from './services/profile.service';
import { LoginGuard } from './guards/login.guard';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './error/error.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { GamesComponent } from './games/games.component';
import { PokemonComponent } from './pokemon/pokemon.component';
import { GameComponent } from './games/game/game.component';
import { PkmnComponent } from './pokemon/pkmn/pkmn.component';

const profRoutes: Routes = [
  {path: '', component: GamesComponent},
  {path: 'games', component: GamesComponent},
  {path: 'pkmn', component: PokemonComponent}
]

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'profile', component: ProfileComponent, children: profRoutes},
  {path: 'user/:id', component: ProfileComponent, children: profRoutes},
  {path: 'login', component: LoginpageComponent},
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
    WelcomeComponent,
    ProfileComponent,
    LoginpageComponent,
    GamesComponent,
    PokemonComponent,
    GameComponent,
    PkmnComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MomentModule,
    TooltipModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RegisterService, useClass: RegisterService},
    { provide: LoginService, useClass: LoginService},
    { provide: LoginGuard, useClass: LoginGuard },
    { provide: InfoService, useClass: InfoService},
    { provide: ProfileService, useClass: ProfileService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
