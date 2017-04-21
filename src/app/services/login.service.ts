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
    return localStorage.getItem("token") != null && localStorage.getItem("user") != null;
  }

  /**
   * Logs a user out.
   */
  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  /**
   * Get the username of the logged in user.
   * @returns The string username, or null.
   */
  getUsername(): string{
    if(this.getUser()){
      return this.getUser().username;
    }
  }

  /**
   * Get the user's ID.
   * @returns The user's ID.
   */
  getUserID(): string{
    if(this.getUser()){
      return this.getUser()._id;
    }
  }

  /**
   * Get the user.
   * @returns The user.
   */
  getUser(): any{
    return JSON.parse(localStorage.getItem("user"));
  }

  /**
   * Update the user.
   * @param user The user to update it to.
   */
  setUser(user: any){
    localStorage.setItem("user", JSON.stringify(user));
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
  setCredentials(token: string, user: any){
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  /**
   * Get the token.
   * @returns The token in storage.
   */
  getToken(): string{
    return localStorage.getItem("token");
  }
}
