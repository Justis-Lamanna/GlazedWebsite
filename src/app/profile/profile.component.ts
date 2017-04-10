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
  id: string;
  user: any;
  status: number;

  constructor(private info: InfoService, private login: LoginService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      if(!login.getUserID()){
        router.navigateByUrl('login');
      }
      this.info.getInfoOnUsername(params['id'] || login.getUsername()).then((user) => {
        if(user){
          this.user = user;
        }
        else{
          router.navigateByUrl('error');
        }
      }).catch((reason) => {
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
  /*
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
  }*/

  /**
   * Called when the user saves an edit.
   * @param form The forms with the new info.
   *//*
  onSubmit(form: FormGroup){
    this.userchange = this.formToBio(form);
    this.submitValues(this.userchange);
  }*/

  /**
   * Converts the form to a user object.
   * The values will be the values of the form, or if they're empty,
   * the original values, or if THEYRE empty, an empty string.
   * @param form The form to convert.
   *//*
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
  */
  /**
   * Called upon successful login.
   * @param bio The bio to set the values to.
   *//*
  onModalSubmit(bio: any){
    this.loginModal.hide();
    this.submitValues(bio);
  }
  */
  /**
   * Handles the actual submission process.
   * Make sure to set "userchange" to the user to change. If the token has expired,
   * a login prompt is provided, which will then retry automatically after a successful
   * login (via onModalSubmit, which calls this after hiding the modal.)
   * 
   * This updates the user in the database, rather than setting. You only need to provide
   * the new fields, rather than all fields. The only requirement is an ID field is provided,
   * called uid. 
   * @param newbio The bio to set to.
   *//*
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
  }*/

  /**
   * Called then edits are cancelled.
   *//*
  onCancel(){
    this.edit = false;
  }
  */
  /**
   * Called when the login modal is cancelled or X'd out.
   * The program takes this as a sign of defeat, so fully
   * logs the user out and returns to the homepage.
   *//*
  onModalCancel(){
    this.onCancel();
    this.loginModal.hide();
    this.login.logout();
    this.router.navigateByUrl('home');
  }*/

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
}
