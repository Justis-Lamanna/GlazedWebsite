import { Component, ViewChild } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  collapsed = false;

  constructor(private login: LoginService, private router: Router){
  }
}
