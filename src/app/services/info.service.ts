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
        let obj = res.json();
        resolve(obj);
      });
    });
  }

  /**
   * Update a user's info.
   * @param uid The user's ID.
   * @param update The update string.
   */
  setInfoOn(uid: String, update: any): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.login.getToken());
      this.http.post('/api/v1/users/id/' + uid, update, {headers: headers}).subscribe((res: Response) => {
        let obj = res.json();
        resolve(obj.success);
      });
    });
  }

  /**
   * Check if a login needs to occur.
   * Also refreshes the token if a login isn't necessary.
   */
  needLogin(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('x-access-token', this.login.getToken());
      this.http.post('/api/v1/users/refresh', {}, {headers: headers}).subscribe((res: Response) => {
        let obj = res.json();
        if(obj.success){
          this.login.setCredentials(obj.token, this.login.getUsername(), this.login.getUserID());
        }
        resolve(obj.success);
      });
    });
  }
}
