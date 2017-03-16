import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

declare var crypto: any;

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  isLoggedIn(): boolean{
    return localStorage.getItem("uid") != null;
  }

  logout(){
    localStorage.removeItem("uid");
    localStorage.removeItem("username");
  }

  getUsername(): string{
    return localStorage.getItem("username");
  }

  login(user: string, pass: string): Promise<any>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/v1/users/verify', {username: user, pass: pass}, {headers: headers}).subscribe((res: Response) => {
        let obj = JSON.parse(res.text());
        resolve(obj);
      });
    });
  }
}
