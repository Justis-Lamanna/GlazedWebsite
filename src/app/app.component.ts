import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  collapsed = false;

  constructor(){}

  /**
   * Check if a user is logged in.
   * @returns True if logged in, false if not.
   */
  isLoggedIn(): boolean{
    return this.getUser() != null;
  }

  /**
   * Get the current user.
   * @returns The username, if it exists.
   */
  getUser(): any{
    return localStorage.getItem('username');
  }

  /**
   * Get the current user's name.
   * This is similar to getUser(), but if local storage does
   * not contain a user, "Player" is returned, rather than null.
   * @returns The user's name, or a default if there is none.
   */
  getUserName(): string{
    let v = this.getUser();
    return v == null ? "Player" : v;
  }

  /**
   * Logs the current user out.
   */
  logout(){
    localStorage.removeItem('username');
  }
}
