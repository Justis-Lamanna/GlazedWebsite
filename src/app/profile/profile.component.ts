import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild("loginModal") loginmodal: any;
  id: string;
  user: any;
  friend: boolean;
  showButton: boolean = false;
  status: number;

  constructor(private info: InfoService, private login: LoginService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      this.info.getInfoOnUsername(params['id']).then((user) => {
        if(user){
          this.user = user;
          if(this.login.getUserID() != user._id){
            this.showButton = true;
          }
          this.isFriends().then((result: boolean) => {
            this.friend = result;
          }).catch((result: any) => {
            console.log(result);
            this.friend = false;
          })
        }
        else{
          console.log(user);
          router.navigateByUrl('error');
        }
      }).catch((reason) => {
        console.log(reason);
        router.navigateByUrl('error');
      });
    });
  }

  ngOnInit() {
    
  }

  //Used for the future, if we want to refresh the user's info every so often.
  //If there's an error, nothing happens.
  refreshUser(){
    this.info.getInfoOnUsername(this.user.username).then((user: any) => {
      if(user){
        this.user = user;
      }
    }).catch((reason: any) => {
      console.log(reason);
    });
  }

  getStatusClass(){
    if(!this.user || !this.user.status || this.user.status == 0){
      return 'text-muted';
    }
    else if(this.user.status == 1){
      return 'text-success';
    }
    else if(this.user.status == 2){
      return 'text-warning';
    }
    else{
      return 'text-danger';
    }
  }

  getStatus(): string{
    if(!this.user || !this.user.status || this.user.status == 0){
      return 'Offline';
    }
    else if(this.user.status == 1){
      return 'Online';
    }
    else if(this.user.status == 2){
      return 'Idle';
    }
    else{
      return 'Unknown';
    }
  }

  isFriends(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      if(!this.login.getUserID()){
        resolve(false);
      }
      else{
        this.info.getInfoOn(this.login.getUserID()).then((user: any) => {
          this.login.setUser(user);
          if(user.friends){
            let them = String(this.user._id);
            if(user.friends.indexOf(them) != -1){
              resolve(true);
            }
          }
          resolve(false);
        }).catch((reason: any) => {
          reject(reason);
        });
      }
    });
  }

  setFriends(friend: boolean){
    if(this.login.getUserID()){
      this.info.getInfoOn(this.login.getUserID()).then((user: any) => {
        let them = String(this.user._id);
        let friendcopy = user.friends;
        if(friend){
          if(!friendcopy){
            friendcopy = new Array<string>();
          }
          friendcopy.push(them);
        }
        else{
          if(friendcopy){
            let index = user.friends.indexOf(them);
            if(index != -1){
              friendcopy.splice(index, 1);
            }
          }
        }
        this.info.setInfoOn(this.login.getUserID(), {friends: friendcopy}).then((user: any) => {
          this.login.setUser(user);
          this.friend = friend;
        }).catch((reason: any) => alert("There was an error contacting the database."));
      }).catch((reason: any) => alert("There was an error contacting the database."));
    }
  }

  setFriends2(friend: boolean){
    this.info.needLogin().then((value: number) => {
      if(value == 1){
        //Successful
        this.setFriends(friend);
      }
      else{
        this.loginmodal.show();
      }
    })
  }

  onModalSubmit(friend: boolean){
    this.loginmodal.hide();
    this.setFriends2(friend);
  }

  onModalCancel(){
    this.loginmodal.hide();
  }
}
