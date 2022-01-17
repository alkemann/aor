import { AdvancesService } from 'src/app/services/advances.service';
import { Injectable } from '@angular/core';
import { Player } from '../models/player';

interface CatCount {
  [key:string]: number
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player;
  others: Player[] = [];

  constructor(private AdvancesService: AdvancesService) { }

  newPlayer(name: string = 'player'): void {
    this.player = new Player(name);
  }

  newOtherPlayer(name: string): void {
    this.others.push(new Player(name));
  }

  public get miseryReliefLevels(): number {
    const cats = this.AdvancesService.categories;
    let counts: CatCount = {};
    for (let cat of cats) {
      if (counts.hasOwnProperty(cat) === false) {
        counts[cat] = 0;
      }
      const adves = this.AdvancesService.allByCategory(cat);
      for (let adv of adves) {
        counts[cat] += this.player.owns(adv.key) ? 1 : 0;
      }
    }
    let min = 6;
    for (let cat of cats) {
      min = Math.min(min, counts[cat]);
    }
    return min
  }


}
