import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pkmnfilter',
  templateUrl: './pkmnfilter.component.html',
  styleUrls: ['./pkmnfilter.component.css']
})
export class PkmnfilterComponent implements OnInit {
  @Input() list: Array<any>;
  @Output() filter: EventEmitter<Array<any>>;
  constructor() {
    this.filter = new EventEmitter();
  }

  ngOnInit() {
  }

  onFilter(){
    this.filter.emit(this.list);
  }
}
