import { Component, OnInit, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { RegisterService } from '../register.service';

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

  constructor(fb: FormBuilder, private cd:ChangeDetectorRef, private reg: RegisterService) {
    this.regForm = fb.group({
      'email': [''],
      'user': [''],
      'pass': [''],
      'confpass': ['']
    });
    this.regForm.controls['confpass'].setValidators(RegisterComponent.checkEquals(this.regForm.controls['pass']));
    this.close = new EventEmitter();
    this.errors = new Array();
  }

  ngOnInit() {
    this.cd.detectChanges();
  }

  /**
   * Called when the user registered for the website.
   * @param form The form contents.
   */
  onRegister(form: any){
    this.errors.splice(0, this.errors.length); //Clear the error log.
    let email = this.regForm.controls['email'];
    let user = this.regForm.controls['user'];
    let pass = this.regForm.controls['pass'];
    let pass2 = this.regForm.controls['confpass'];
    if(email.hasError('required')){
      this.errors.push('An email must be specified.');
    }
    else if(email.hasError('pattern')){
      this.errors.push('Email must be in the form of [name]@[website].')
    }
    if(user.hasError('required')){
      this.errors.push('A username must be specified.');
    }
    else if(user.hasError('minlength') || user.hasError('maxlength')){
      this.errors.push('Username must be between 6 and 20 characters.');
    }
    else if(user.hasError('pattern')){
      this.errors.push('Username can only contain letters, numbers, underscores, or dashes.');
    }
    if(pass.hasError('required')){
      this.errors.push('A password must be specified.');
    }
    else if(pass.hasError('minlength') || pass.hasError('maxlength')){
      this.errors.push('Password must be between 6 and 20 characters.');
    }
    if(pass2.hasError('notequal')){
     this.errors.push('Passwords do not match.');
    }
    if(this.errors.length == 0){
      console.log("Form was valid!");
      //Do the thing.
      let creds = new Credentials(email.value, user.value, pass.value);
      this.reg.usernameExists(creds).subscribe((exists: boolean) => {
        if(exists){
          this.errors.push('This username is already in use.');
          console.log('Registration failed.');
        }
        else{
          console.log('Registered successfully! (Not Really)');
        }
      });
    }
  }

  /**
   * Handles any code from this side that happens when a close event is triggered.
   */
  closeModal(){
    this.errors.splice(0, this.errors.length);
    this.close.emit('');
  }

  /**
   * Compares two fields for equality.
   * @param group The group to compare to this one for equality.
   */
  static checkEquals(group: AbstractControl): ValidatorFn{
    return (c: AbstractControl) => {
      return group.value == c.value ? null : {notequal: true};
    };
  }
}
export class Credentials{
  constructor(
    public email: string,
    public username: string,
    public password: string
  ){}
}