import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { LoginService } from './login.service';

@Injectable()
export class InfoService {

  constructor(private http: Http, private login: LoginService) { }

  /**
   * Get information on some user.
   * @param uid The user's ID.
   */
  getInfoOn(uid: String): Promise<any>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.login.getToken());
      this.http.get('/api/v1/users/id/' + uid, {headers: headers}).subscribe((res: Response) => {
        if(res.json()){
          let obj = res.json();
          if(obj._id){
            resolve(obj);
          }
          else{
            reject({reason: 'No such user.'});
          }
        }
        else{
          reject({reason: 'No such user.'});
        }
      });
    });
  }

    /**
   * Get information on some user.
   * @param uid The user's ID.
   */
    getInfoOnUsername(user: String): Promise<any>{
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', this.login.getToken());
        this.http.get('/api/v1/users/username/' + user, {headers: headers}).subscribe((res: Response) => {
          if(res.json()){
            let obj = res.json();
            if(obj._id){
              resolve(obj);
            }
            else{
              reject({reason: 'No such user.'});
            }
          }
          else{
            reject({reason: 'No such user.'});
          }
        });
      });
    }

  /**
   * Update a user's info.
   * @param uid The user's ID.
   * @param update The update string.
   */
  setInfoOn(uid: String, update: any): Promise<any>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.login.getToken());
      this.http.post('/api/v1/users/id/' + uid, update, {headers: headers}).subscribe((res: Response) => {
        let obj = res.json();
        if(obj.success){
          resolve(obj.user);
        }
        else{
          reject(obj.message);
        }
      });
    });
  }

  /**
   * Check if a login needs to occur.
   * Also refreshes the token if a login isn't necessary.
   * @returns Promise that resolves to 0 if token expired, 1 if token is okay, and -1 if another error.
   */
  needLogin(): Promise<number>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.login.getToken());
      this.http.post('/api/v1/users/refresh', {}, {headers: headers}).subscribe((res: Response) => {
        let obj = res.json();
        if(obj.tokenfail){
          resolve(0);
        }
        else if(obj.success){
          this.login.setCredentials(obj.token, this.login.getUser());
          resolve(1);
        }
        else{
          resolve(-1);
        }
      }, (err: Response) => {
        resolve(0);
      });
    });
  }
}
