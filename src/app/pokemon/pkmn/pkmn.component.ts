import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-pkmn',
  templateUrl: './pkmn.component.html',
  styleUrls: ['./pkmn.component.css']
})
export class PkmnComponent implements OnInit {
  @Input() pkmn: any;
  mouse: boolean;
  constructor(private route : Router, private prof: ProfileService) { }

  ngOnInit() {
  }

  //This should really be a thing.
  titlecase(word: string): string{
    let split = word.split(' ');
    let done = '';
    for(var index = 0; index < split.length; index++){
      if(index != 0){
        done += ' ';
      }
      done += split[index].slice(0, 1).toUpperCase() + split[index].slice(1);
    }
    return done;
  }
}
