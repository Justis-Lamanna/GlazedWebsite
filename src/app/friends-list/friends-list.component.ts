import { Component, OnInit, Input } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  @Input() user: any;
  friends: Array<any>;
  constructor(private info: InfoService, private login: LoginService) {
    
  }

  ngOnInit() {
    this.info.getUsers(this.user.friends).then((users: any[]) => this.friends = users);
  }

}
