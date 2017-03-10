import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  outputs:['close']
})
export class RegisterComponent implements OnInit {

  regForm: FormGroup;
  close: EventEmitter<string>;
  errors: string[];

  constructor(fb: FormBuilder) {
    this.regForm = fb.group({
      'user': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'pass': ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      'confpass': ['', Validators.required]
    })
    this.close = new EventEmitter();
    this.errors = new Array();
  }

  ngOnInit() {
  }

  /**
   * Called when the user registered for the website.
   * @param form The form contents.
   */
  onRegister(form: any){
    this.errors.splice(0, this.errors.length); //Clear the error log.
    let user = this.regForm.controls['user'];
    let pass = this.regForm.controls['pass'];
    let pass2 = this.regForm.controls['confpass'];
    if(user.hasError('required')){
      this.errors.push('A username must be specified.');
    }
    else if(user.hasError('minlength') || user.hasError('maxlength')){
      this.errors.push('Username must be between 6 and 20 characters.');
    }
    if(pass.hasError('required')){
      this.errors.push('A password must be specified.');
    }
    else if(pass.hasError('minlength') || pass.hasError('maxlength')){
      this.errors.push('Password must be between 6 and 20 characters.');
    }
    if(this.errors.length == 0 && !form.valid){
      this.errors.push('An error occured processing your registration.');
    }
    console.log(form);
  }

  closeModal(){
    this.errors.splice(0, this.errors.length);
    this.close.emit('');
  }
}
