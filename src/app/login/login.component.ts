import { Component, OnInit, EventEmitter } from '@angular/core';
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

  constructor(fb: FormBuilder) {
    this.loginForm = fb.group({
      'user': [''],
      'pass': ['']
    });
    this.close = new EventEmitter();
  }

  ngOnInit() {
  }

  /**
   * Called when the user enters their credentials to log in.
   * @param form The form contents.
   */
  onLogin(form: any){
    console.log(form);
  }

}
