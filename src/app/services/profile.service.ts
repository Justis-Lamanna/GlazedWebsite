import { Injectable } from '@angular/core';
import { ProfileComponent } from '../profile/profile.component';

//Service for allowing profile and its tabs to interact.
@Injectable()
export class ProfileService {

  parent: ProfileComponent;

  constructor() { }

  setParent(p: ProfileComponent){
    this.parent = p;
  }

  getParent(): ProfileComponent{
    return this.parent;
  }
}
