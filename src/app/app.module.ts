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
import { TabsModule } from 'ng2-bootstrap';
import { AlertModule } from 'ng2-bootstrap';
import { ProgressbarModule } from 'ng2-bootstrap';

import { RegisterService } from './services/register.service';
import { LoginService } from './services/login.service';
import { InfoService } from './services/info.service';
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
import { PkmnfilterComponent } from './pokemon/pkmnfilter/pkmnfilter.component';
import { PkmnprofileComponent } from './pkmnprofile/pkmnprofile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FriendsListComponent } from './friends-list/friends-list.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [LoginGuard]},
  {path: 'user/:id', component: ProfileComponent},
  {path: 'user/:uid/pkmn/:pid', component: PkmnprofileComponent},
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
    PkmnfilterComponent,
    PkmnprofileComponent,
    DashboardComponent,
    FriendsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    MomentModule,
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    ProgressbarModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RegisterService, useClass: RegisterService},
    { provide: LoginService, useClass: LoginService},
    { provide: LoginGuard, useClass: LoginGuard },
    { provide: InfoService, useClass: InfoService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
