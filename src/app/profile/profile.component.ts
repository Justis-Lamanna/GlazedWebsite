import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('loginModal') loginModal: ModalDirective;
  user: any;
  edit: boolean;
  form: FormGroup;
  aboutme = "";

  constructor(private info: InfoService, private login: LoginService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      bio: [''],
      location: [''],
      pkmn: [''],
      move: [''],
      ability: [''],
      nature: [''],
      game: ['']
    });
  }

  ngOnInit() {
    this.info.getInfoOn(this.login.getUserID()).then((user) => {
      this.user = user;
      this.aboutme = user.bio || '';
    });
  }

  setEdit(form: FormGroup){
    this.edit = true;
    this.form = this.fb.group({
      bio: [this.user.bio],
      location: [this.user.location],
      pkmn: [this.user.fav.pkmn],
      move: [this.user.fav.move],
      ability: [this.user.fav.ability],
      nature: [this.user.fav.nature],
      game: [this.user.fav.game]
    });
  }

  onSubmit(form: FormGroup){
    let newbio = {
      bio: form['bio'] || this.user.bio || '',
      location: form['location'] || this.user.location || '',
      fav: {
        pkmn: form['pkmn'] || this.user.fav.pkmn || '',
        move: form['move'] || this.user.fav.move || '',
        ability: form['ability'] || this.user.fav.ability || '',
        nature: form['nature'] || this.user.fav.nature || '',
        game: form['game'] || this.user.fav.game || ''
      }
    };
    this.submitValues(newbio);
  }

  onModalSubmit(form: FormGroup){
    this.onSubmit(form);
  }

  submitValues(newbio: any){
    this.info.needLogin().then((res: number) => {
      if(res == 1){
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
      else if(res == 0){
        this.loginModal.show();
      }
      else{
        alert("Error interacting with the database. Please try again later.");
      }
    });
  }

  onCancel(form: any){
    this.edit = false;
  }

  onModalClose(form: any){
    this.onCancel(form);
    this.router.navigateByUrl('home');
  }
}
