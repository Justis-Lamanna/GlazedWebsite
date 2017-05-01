import { Injectable, EventEmitter } from '@angular/core';
import { Credentials } from '../register/register.component';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class RegisterService {

  private root: string = 'localhost:3000';

  constructor(private http: Http) { }

  /**
   * Checks if a username exists.
   * @param frm The credentials object to check.
   * @returns An emitter that emits true or false when it finishes checking.
   */
  usernameExists(frm: Credentials): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.get('/api/v1/users/username/' + frm.username.toLowerCase())
      .subscribe(
        (res: Response) => {
          if(res.text() == "null"){
            resolve(false);
          }
          else{
            resolve(true);
          }
        }
      );
    })
  }

  /**
   * Registers a user.
   * @param frm The credentials object to register.
   * @returns An emitter which emits the final credentials when registration finishes.
   */
  register(frm: Credentials): Promise<any>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/v1/users', JSON.stringify(frm), {headers: headers}).subscribe(
        (res: Response) => {
          let v = JSON.parse(res.text());
          resolve(v);
        }
      );
    })
  }
}
