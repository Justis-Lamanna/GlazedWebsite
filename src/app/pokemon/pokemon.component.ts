import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() user: any;
  pkmnList: Array<any>;
  constructor() {}

  ngOnInit() {
    
  }

  print(list: Array<any>){
    this.pkmnList = list;
  }
}
