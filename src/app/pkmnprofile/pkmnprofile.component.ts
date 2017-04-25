import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { InfoService } from '../services/info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pkmnprofile',
  templateUrl: './pkmnprofile.component.html',
  styleUrls: ['./pkmnprofile.component.css']
})
export class PkmnprofileComponent implements OnInit {
  public user: any;
  public pkmn: any;
  public index: number;

  public static stats: Array<any> = [
    {name: 'HP',              abbr: 'HP',   json: 'hp'},
    {name: 'Attack',          abbr: 'Atk',  json: 'attack'},
    {name: 'Defense',         abbr: 'Def',  json: 'defense'},
    {name: 'Special Attack',  abbr: 'SpA',  json: 'specialattack'},
    {name: 'Special Defense', abbr: 'SpD',  json: 'specialdefense'},
    {name: 'Speed',           abbr: 'Spe',  json: 'speed'}
  ];

  constructor(private info: InfoService, private route: ActivatedRoute) {
    route.params.subscribe(params => {
      let uid = String(params['uid']);
      let pid = String(params['pid']);
      this.info.getInfoOnUsername(uid).then((user: any) => {
        this.user = user;
        if(user.pokemon){
          for(let index = 0; index < user.pokemon.length; index++){
            if(user.pokemon[index]._id == pid){
              this.pkmn = user.pokemon[index];
              this.index = index;
              break;
            }
          }
        }
        else{
          //Invalid 'mon
        }
      }).catch((reason: any) => {
        //Invalid 'mon
      });
    });
  }

  ngOnInit() {

  }

  comma(value: number): string{
    let retString = "";
    let val = value;
    while(val >= 1000){
      let upper = Math.trunc(val / 1000);
      let lower = Math.trunc(val % 1000);
      retString = "," + lower + retString;
      val = upper;
    }
    return val + retString;
  }

}
