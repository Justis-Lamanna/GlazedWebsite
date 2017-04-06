import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pkmnfilter',
  templateUrl: './pkmnfilter.component.html',
  styleUrls: ['./pkmnfilter.component.css']
})
export class PkmnfilterComponent implements OnInit {
  @Input() list: Array<any>;
  @Output() filter: EventEmitter<Array<any>>;
  collapsed: boolean = true;
  constructor() {
    this.filter = new EventEmitter();
  }

  ngOnInit() {
  }

  onFilter(){
    this.filter.emit(this.list);
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
        var spec = String(list[index].species).slice(0, 1);
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
