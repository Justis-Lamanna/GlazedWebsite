import { Injectable, EventEmitter } from '@angular/core';
import { Credentials } from '../register/register.component';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class RegisterService {

  constructor(private http: Http) { }

  /**
   * Checks if a username exists.
   * @param frm The credentials object to check.
   * @returns An emitter that emits true or false when it finishes checking.
   */
  usernameExists(frm: Credentials): EventEmitter<boolean>{
    let obs = new EventEmitter<boolean>();
    this.http.get('/api/v1/users/username/' + frm.username.toLowerCase())
    .subscribe(
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

  /**
   * Registers a user.
   * @param frm The credentials object to register.
   * @returns An emitter which emits the final credentials when registration finishes.
   */
  register(frm: Credentials): EventEmitter<any>{
    let obs = new EventEmitter<any>();
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post('/api/v1/users', JSON.stringify(frm), {headers: headers}).subscribe(
      (res: Response) => {
        let v = JSON.parse(res.text());
        obs.emit(v);
      }
    );
    return obs;
  }
}
