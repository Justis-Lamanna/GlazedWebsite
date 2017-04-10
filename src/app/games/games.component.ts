import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }
}
