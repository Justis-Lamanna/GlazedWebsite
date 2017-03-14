import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  outputs: ['close']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  close: EventEmitter<string>;
  errors: string[];

  constructor(fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.loginForm = fb.group({
      'user': [''],
      'pass': ['']
    });
    this.close = new EventEmitter();
    this.errors = new Array();
  }

  ngOnInit() {
    this.cd.detectChanges();
  }

  /**
   * Called when the user enters their credentials to log in.
   * @param form The form contents.
   */
  onLogin(form: any){
    this.errors.splice(0, this.errors.length); //Clear the error log.
    let user = this.loginForm.controls['user'];
    let pass = this.loginForm.controls['pass'];
    if(user.hasError('required')){
      this.errors.push('Please enter a Username or Email Address.');
    }
    if(pass.hasError('required')){
      this.errors.push('Please enter a password.');
    }
    console.log(form);
  }

}
