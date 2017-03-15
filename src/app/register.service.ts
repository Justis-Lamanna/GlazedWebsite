import { Injectable, EventEmitter } from '@angular/core';
import { Credentials } from './register/register.component';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  usernameExists(frm: Credentials): EventEmitter<boolean>{
    let obs = new EventEmitter<boolean>();
    this.http.get('/api/v1/users/username/' + frm.username.toLowerCase()).subscribe(
      (res: Response) => {
        if(res.text() == "null"){
          obs.emit(false);
        }
        else{
          obs.emit(true);
        }
      }
    );
    return obs;
  }

}
