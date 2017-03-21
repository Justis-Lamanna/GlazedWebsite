import { Injectable, EventEmitter } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  /**
   * Checks if a user is logged in.
   * @returns True if logged in, false if not.
   */
  isLoggedIn(): boolean{
    return localStorage.getItem("token") != null;
  }

  /**
   * Logs a user out.
   */
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("uid");
  }

  /**
   * Get the username of the logged in user.
   * @returns The string username, or null.
   */
  getUsername(): string{
    return localStorage.getItem("username");
  }

  /**
   * Get the user's ID.
   * @returns The user's ID.
   */
  getUserID(): string{
    return localStorage.getItem("uid");
  }

  /**
   * Logs the user in.
   * The promise returned will either return {error: true, reason: [reason]}, or {error: false}.
   * @param user The username.
   * @param pass The password.
   * @returns A promise containing the result of login.
   */
  login(user: string, pass: string, remember: boolean): Promise<any>{
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post('/api/v1/users/verify', {username: user.toLowerCase(), pass: pass, remember: remember}, {headers: headers}).subscribe((res: Response) => {
        let obj = JSON.parse(res.text());
        resolve(obj);
      });
    });
  }

  /**
   * Sets the local credentials.
   * @param uid The id of the user.
   * @param username The username of the user.
   */
  setCredentials(token: string, username: string, uid: string){
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("uid", uid);
  }

  /**
   * Get the token.
   * @returns The token in storage.
   */
  getToken(): string{
    return localStorage.getItem("token");
  }
}
