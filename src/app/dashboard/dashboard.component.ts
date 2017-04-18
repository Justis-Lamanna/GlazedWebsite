import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { InfoService } from '../services/info.service';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild("loginModal") loginmodal: any;
  private user: any;
  private newuser: any = new Object();
  private form: FormGroup;

  private message: String;
  private error: boolean;
  
  constructor(private login: LoginService, private info: InfoService, private fb: FormBuilder) {
    this.form = this.fb.group({
        bio: [''],
        location: [''],
        pkmn: [''],
        move: [''],
        ability: [''],
        nature: [''],
        game: ['']
      });
    this.info.getInfoOn(login.getUserID()).then((user: any) => {
      this.user = user;
      this.form.controls['bio'].setValue(user.bio || '');
      this.form.controls['location'].setValue(user.location || '');
      this.form.controls['pkmn'].setValue(user.fav.pkmn || '');
      this.form.controls['move'].setValue(user.fav.move || '');
      this.form.controls['ability'].setValue(user.fav.ability || '');
      this.form.controls['nature'].setValue(user.fav.nature || '');
      this.form.controls['game'].setValue(user.fav.game || '');
    }).catch((reason: any) => {console.log(reason);});
  }

  ngOnInit() {
  }

  onModalCancel(){
    //Cancel
    this.loginmodal.hide();
  }

  onModalSubmit(){
    //Submit
    this.loginmodal.hide();
    this.submitValues();
  }

  submitForm(form: FormGroup){
    //set up newbio;
    this.newuser.bio = form.controls['bio'].value || '';
    this.newuser.location = form.controls['location'].value || '';
    if(!this.newuser.fav){
      this.newuser.fav = {};
    }
    this.newuser.fav.pkmn = form.controls['pkmn'].value || '';
    this.newuser.fav.move = form.controls['move'].value || '';
    this.newuser.fav.ability = form.controls['ability'].value || '';
    this.newuser.fav.nature = form.controls['nature'].value || '';
    this.newuser.fav.game = form.controls['game'].value || '';
    this.submitValues();
  }

  submitValues(){
    this.info.needLogin().then((res: number) => {
      if(res == 1){
        this.newuser.lastactivity = {date: new Date(), activity: 'Updating Profile'};
        this.info.setInfoOn(this.login.getUserID(), this.newuser).then((user: any) => {
          this.login.setUser(user);
          this.error = false;
          this.message = "Profile successfully updated!";
        }).catch((err: any) => {
          this.error = true;
          console.log(err);
          this.message = "There was an error updating your profile page.";
        });
      }
      else if(res == 0){
        this.loginmodal.show();
      }
      else{
        this.error = true;
        this.message = "There was an error updating your profile page..."
      }
    });
  }

  getBioLengthClass(): string{
    let length = this.form.controls['bio'].value.length;
    if(length > 290){
      return 'text-danger';
    }
    else if(length > 200){
      return 'text-warning';
    }
    else{
      return 'text-muted';
    }
  }
}
