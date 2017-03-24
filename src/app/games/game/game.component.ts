import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() game: any;
  @Output() onDelete: EventEmitter<any> = new EventEmitter();

  mouse: boolean;
  constructor(private prof: ProfileService) {
  }

  ngOnInit() {}

  delete(){
    let v = confirm("Are you sure you want to delete this game from your profile?");
    if(v){
      this.onDelete.emit();
    }
  }

}
