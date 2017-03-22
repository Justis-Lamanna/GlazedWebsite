import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  constructor(private prof: ProfileService) { }

  ngOnInit() {
  }

  delete(index: number){
    let user = this.prof.getParent().user;
    var games: Array<any> = user.games;
    games.splice(index, 1); //Remove.
    let newuser = {
      uid: user.uid,
      games: games
    };
    this.prof.getParent().userchange = newuser;
    this.prof.getParent().submitValues(newuser);
  }

}
