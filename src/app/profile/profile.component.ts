import { Component, OnInit } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  edit: boolean;
  aboutme = "";

  constructor(private info: InfoService, private login: LoginService) { }

  ngOnInit() {
    this.info.getInfoOn(this.login.getUserID()).then((user) => {
      this.user = user;
      if(user.bio){
        this.aboutme = user.bio;
      }
    });
  }
}
