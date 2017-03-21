import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';
import { FormGroup } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('loginModal') loginModal: ModalDirective;
  user: any;
  edit: boolean;

  aboutme = "";

  constructor(private info: InfoService, private login: LoginService) { }

  ngOnInit() {
    this.info.getInfoOn(this.login.getUserID()).then((user) => {
      this.user = user;
      this.aboutme = user.bio || '';
    });
  }

  onSubmit(form: FormGroup){
    let newbio = {
      bio: form['bio'],
      location: form['location'],
      fav: {
        pkmn: form['pkmn'],
        move: form['move'],
        ability: form['ability'],
        nature: form['nature'],
        game: form['game']
      }
    };
    this.submitValues(newbio);
  }

  onModalSubmit(form: FormGroup){
    this.onSubmit(form);
  }

  submitValues(newbio: any){
    this.info.needLogin().then((res: boolean) => {
      if(res){
        this.info.setInfoOn(this.login.getUserID(), newbio).then((res: boolean) => {
          if(res){
            this.edit = false;
            this.user.bio = newbio.bio;
            this.user.location = newbio.location;
            this.user.fav = newbio.fav;
          }
          else{
            this.loginModal.show();
          }
        });
      }
      else{
        this.loginModal.show();
      }
    });
  }

  onCancel(form: FormGroup){
    form.reset();
    this.edit = false;
  }

  onModalClose(form: FormGroup){
    this.onCancel(form);
  }
}
