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
}
