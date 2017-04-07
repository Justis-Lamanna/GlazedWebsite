import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pkmnList: Array<any>;
  constructor(private prof: ProfileService) {
    //this.pkmnList = prof.getParent().user.pokemon;
  }

  ngOnInit() {
    
  }

  print(list: Array<any>){
    this.pkmnList = list;
  }
}
