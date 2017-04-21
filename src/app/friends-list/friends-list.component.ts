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
    this.info.getUsers(this.user.friends).then((users: any[]) => {
      users.sort((one, two) => {
        if(!one.status && !two.status){
          return 0;
        }
        if(!one.status){
          return -1;
        }
        if(!two.status){
          return 1;
        }
        let one_status = Number(one.status);
        if(one_status == 1){
          one_status = 2;
        }
        else if(one_status == 2){
          one_status = 1;
        }
        let two_status = Number(two.status);
        if(two_status == 1){
          two_status = 2;
        }
        else if(two_status == 2){
          two_status = 1;
        }
        if(one_status < two_status){
          return 1;
        }
        if(one_status > two_status){
          return -1;
        }
        return 0;
      });
      this.friends = users;
    });
  }

  goToUser(username: string){
    this.route.navigateByUrl('user/' + username);
  }

  getStatus(user: any): string{
    if(!user.status || user.status == 0){
      return 'Offline';
    }
    else if(user.status == 1){
      return 'Online';
    }
    else if(user.status == 2){
      return 'Idle';
    }
    else{
      return 'Unknown';
    }
  }

  getStatusColor(user: any): string{
    if(!user.status || user.status == 0){
      return 'text-muted';
    }
    else if(user.status == 1){
      return 'text-success';
    }
    else if(user.status == 2){
      return 'text-warning';
    }
    else{
      return 'text-danger';
    }
  }
}
