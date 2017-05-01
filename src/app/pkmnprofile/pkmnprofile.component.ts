import { Component, OnInit } from '@angular/core';
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
  public species: any;
  public index: number;

  public stats: Array<any> = [
    {name: 'HP',              abbr: 'HP',   json: 'hp'},
    {name: 'Attack',          abbr: 'Atk',  json: 'attack'},
    {name: 'Defense',         abbr: 'Def',  json: 'defense'},
    {name: 'Special Attack',  abbr: 'SpA',  json: 'specialattack'},
    {name: 'Special Defense', abbr: 'SpD',  json: 'specialdefense'},
    {name: 'Speed',           abbr: 'Spe',  json: 'speed'}
  ];

  public static expGroups: any = {
    erratic: 600000,
    fast: 800000,
    medium_fast: 1000000,
    medium_slow: 1059860,
    slow: 1250000,
    fluctuating: 1640000
  };

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
              this.info.getPokemon(this.pkmn.species.toLowerCase()).then((species: any) => {
                this.species = species;
              });
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
    if(!value){
      return '';
    }
    let retString = "";
    let val = value;
    while(val >= 1000){
      let upper = Math.trunc(val / 1000);
      let lower = Math.trunc(val % 1000);
      if(lower < 10){
        retString = ",00" + lower + retString;
      }
      else if(lower < 100){
        retString = ",0" + lower + retString;
      }
      else{
        retString = "," + lower + retString;
      }
      val = upper;
    }
    return val + retString;
  }

  getMaxExperience(): number{
    if(this.species){
      return PkmnprofileComponent.expGroups[this.species.levelrate];
    }
  }

  /**
   * A function to map thresholds to strings.
   * This is used to have the various bars change colors depending on their value.
   * The n-th string is chosen if (num / max) is between thresholds[n-1] (excl) and thresholds[n] (incl).
   * For n = 0, thresholds[0] is chosen.
   * @param num The numberator of the fraction to check.
   * @param max The denominator of the fraction to check.
   * @param thresholds A list of threshold fractions.
   * @param choices A list of choices corresponding to fractions.
   * @param def The value of nothing matches.
   */
  getThreshold(num: number, max: number, thresholds: number[], choices: string[], def: string): string{
    let frac = num / max;
    var choice;
    thresholds.forEach((num, index, array) => {
      if(!choice && frac <= num){
        choice = choices[index];
      }
    });
    return (choice || def);
  }

  calculate(level: number, base: number, ev: number, iv: number, nature: number){
    return Math.floor((Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5) * nature);
  }

  /**
   * Calculate the highest a stat can be.
   * @param stat The stat
   */
  calculateHighest(stat: string): number{
    if(this.species && this.species.basestats && this.species.basestats[stat]){
      let base = this.species.basestats[stat];
      return this.calculate(this.pkmn.level, base, 255, 31, 1.1);
    }
  }

  /**
   * Calculate the lowest a stat can be.
   * @param stat The stat
   */
  calculateLowest(stat: string): number{
    if(this.species && this.species.basestats && this.species.basestats[stat]){
      let base = this.species.basestats[stat];
      return this.calculate(this.pkmn.level, base, 0, 0, 0.9);
    }
  }

  calculateHP(level: number, base: number, ev: number, iv: number){
    return Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + this.pkmn.level + 10;
  }

  calculateHighestHP(){
    if(this.species && this.species.basestats && this.species.basestats.hp){
      let base = this.species.basestats.hp;
      return this.calculateHP(this.pkmn.level, base, 255, 31);
    }
  }

  calculateLowestHP(){
    if(this.species && this.species.basestats && this.species.basestats.hp){
      let base = this.species.basestats.hp;
      return this.calculateHP(this.pkmn.level, base, 0, 0);
    }
  }

  sumEVs(): number{
    let count = 0;
    for(let index = 0; index < this.stats.length; index++){
      let name = this.stats[index].json;
      if(this.pkmn && this.pkmn.evs){
        count += this.pkmn.evs[name];
      }
    }
    return count;
  }
}
