import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pkmnfilter',
  templateUrl: './pkmnfilter.component.html',
  styleUrls: ['./pkmnfilter.component.css']
})
export class PkmnfilterComponent implements OnInit {
  @Input() list: Array<any>;
  @Output() filter: EventEmitter<Array<any>>;
  species: Array<string>;
  type: Array<string>;
  ability: Array<string>;
  letter: Array<string>;
  move: Array<string>;
  nature: Array<string>;

  collapsed: boolean = true;
  constructor() {
    this.filter = new EventEmitter();
  }

  ngOnInit() {
  }

  onReset(){
    this.species = [];
    this.type = [];
    this.ability = [];
    this.letter = [];
    this.move = [];
    this.nature = [];
    this.onFilter();
  }

  onFilter(){
    let copy = new Array<any>();
    for(var index = 0; index < this.list.length; index++){
      let pkmn = this.list[index];
      if(!this.valid(pkmn, 'species', this.species)){
        continue;
      }
      if(!this.valid(pkmn, 'type', this.type)){
        continue;
      }
      if(!this.valid(pkmn, 'ability', this.ability)){
        continue;
      }
      if(!this.validInitial(pkmn, this.letter)){
        continue;
      }
      if(!this.valid(pkmn, 'move', this.move)){
        continue;
      }
      if(!this.valid(pkmn, 'nature', this.nature)){
        continue;
      }
      copy.push(pkmn);
    }
    this.filter.emit(copy);
  }

  valid(pkmn: any, field: string, values: Array<string>): boolean{
    if((!values) || values.length == 0){
      return true;
    }
    let value = String(pkmn[field]);
    for(var index = 0; index < values.length; index++){
      if(value == values[index]){
        return true;
      }
    }
    return false;
  }

  validInitial(pkmn: any, values: Array<string>): boolean{
    if((!values) || values.length == 0){
      return true;
    }
    let name = pkmn.nickname || pkmn.species;
    for(var index = 0; index < values.length; index++){
      if(name.slice(0, 1) == values[index].slice(0, 1)){
        return true;
      }
    }
    return false;
  }

  copy(list: Array<any>): Array<any>{
    let nuu = new Array<any>();
    let i = list.length;
    while(i--){
      nuu[i] = list[i];
    }
    return nuu;
  }

  unique(list: Array<any>, field: string): Array<any>{
    let copy = new Array<any>();
    let found = false;
    for(var index = 0; index < list.length; index++){
      if(list[index][field]){
        var spec = String(list[index][field]);
        for(var copyindex = 0; copyindex < copy.length; copyindex++){
          var check = String(copy[copyindex]);
          if(spec == check){
            found = true;
            break;
          }
        }
        if(!found){
          copy.push(spec);
        }
        found = false;
      }
    }
    copy.sort();
    return copy;
  }

  initials(list: Array<any>): Array<any>{
    let copy = new Array<any>();
    let found = false;
    for(var index = 0; index < list.length; index++){
      if(list[index].species){
        var spec = String(list[index].nickname || list[index].species).slice(0, 1);
        for(var copyindex = 0; copyindex < copy.length; copyindex++){
          var check = String(copy[copyindex]);
          if(spec == check){
            found = true;
            break;
          }
        }
        if(!found){
          copy.push(spec);
        }
        found = false;
      }
    }
    copy.sort();
    return copy;
  }

  moves(list: Array<any>): Array<any>{
    let copy = new Array<any>();
    let found = false;
    for(var index = 0; index < list.length; index++){
      if(list[index].moves){
        for(var moveindex = 0; moveindex < list[index].moves.length; moveindex++){
          let spec = String(list[index].moves[moveindex].name);
          for(var copyindex = 0; copyindex < copy.length; copyindex++){
            var check = String(copy[copyindex]);
            if(spec == check){
              found = true;
              break;
            }
          }
          if(!found){
            copy.push(spec);
          }
          found = false;
        }
      }
    }
    copy.sort();
    return copy;
  }
}
