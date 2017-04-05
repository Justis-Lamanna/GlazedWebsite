import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pkmn',
  templateUrl: './pkmn.component.html',
  styleUrls: ['./pkmn.component.css']
})
export class PkmnComponent implements OnInit {
  @Input() pkmn: any;
  constructor() { }

  ngOnInit() {
  }
}
