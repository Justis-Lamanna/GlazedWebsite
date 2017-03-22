import { Component, OnInit, ViewChild } from '@angular/core';
import { InfoService } from '../services/info.service';
import { LoginService } from '../services/login.service';
import { ModalDirective } from 'ng2-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('loginModal') loginModal: ModalDirective;
  id: string;
  user: any;
  userchange: any;

  canedit: boolean;
  edit: boolean;
  form: FormGroup;
  aboutme = "";
  tab = 0;

  constructor(private info: InfoService, private login: LoginService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private prof: ProfileService) {
    this.form = this.fb.group({
      bio: [''],
      location: [''],
      pkmn: [''],
      move: [''],
      ability: [''],
      nature: [''],
      game: ['']
    });
    route.params.subscribe(params => {
      this.canedit = params['id'] == null;
      if(this.canedit && !login.getUserID()){
        router.navigateByUrl('login');
      }
      this.info.getInfoOnUsername(params['id'] || login.getUsername()).then((user) => {
        if(user){
          this.user = user;
          this.aboutme = user.bio || '';
        }
        else{
          router.navigateByUrl('error');
        }
      }).catch((reason) => {
        router.navigateByUrl('error');
      });
    });
    prof.setParent(this);
  }

  ngOnInit() {
    
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
    this.userchange = this.formToBio(form);
    this.submitValues(this.userchange);
  }

  formToBio(form: FormGroup): any{
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
    return newbio;
  }

  onModalSubmit(bio: any){
    this.loginModal.hide();
    this.submitValues(bio);
  }

  submitValues(newbio: any){
    this.info.needLogin().then((res: number) => {
      if(res == 1){
        this.info.setInfoOn(this.login.getUserID(), newbio).then((res: number) => {
          if(res == 1){
            this.edit = false;
            this.user.bio = newbio.bio || this.user.bio;
            this.user.location = newbio.location || this.user.location;
            this.user.fav = newbio.fav || this.user.fav;
            this.user.games = newbio.games || this.user.games;
          }
          else if(res == 0){
            this.loginModal.show();
          }
          else{
            alert("Cannot update an account that is not your own!");
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

  onCancel(){
    this.edit = false;
  }

  onModalCancel(){
    this.onCancel();
    this.loginModal.hide();
    this.login.logout();
    this.router.navigateByUrl('home');
  }
}
