import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.css']
})
export class FriendsListComponent implements OnInit {
  @Input() user: any;
  constructor() { }

  ngOnInit() {
  }

}
