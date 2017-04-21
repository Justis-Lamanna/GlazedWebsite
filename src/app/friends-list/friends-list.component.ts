import { Component, OnInit, Input } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  @Input() user: any;
  friends: Array<any>;
  constructor(private info: InfoService, private login: LoginService, private route: Router) {
    
  }

  ngOnInit() {
    this.info.getUsers(this.user.friends).then((users: any[]) => this.friends = users);
  }

  goToUser(username: string){
    this.route.navigateByUrl('user/' + username);
  }
}
