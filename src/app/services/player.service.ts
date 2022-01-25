import { AdvancesService } from 'src/app/services/advances.service';
import { Injectable } from '@angular/core';
import { Player, User } from '../models/player';
import { Bid } from '../interfaces/bid';

interface CatCount {
  [key:string]: number
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: User;
  others: Player[] = [];

  private _bids: Bid[] = [];

  constructor(private AdvancesService: AdvancesService) { }

  newPlayer(name: string = 'player'): void {
    this.player = new User(name);
  }

  newOtherPlayer(name: string): void {
    this.others.push(new Player(name));
  }

  public get bids(): Bid[] { return this._bids; }

  setBids(): void {
    const bids: Bid[] = [];
    bids.push({name: this.player.name, $: this.player.bid, nation: this.player.nation});
    this.others.forEach(p => bids.push({
      name: p.name, $: p.bid, nation: p.nation
    }));
    bids.sort( (a,b) => a.$ < b.$ ? 1 : -1 );
    this._bids = bids;
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

  public restart(): void {
    this.player = new User("PLACEHOLDER");
    this.others = [];
    this._bids = [];
  }
}
