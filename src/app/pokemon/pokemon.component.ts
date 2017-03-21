import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  constructor(private prof: ProfileService) { }

  ngOnInit() {
    
  }

}
