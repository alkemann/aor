import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player;
  others: Player[] = [];

  constructor() {}

  addGold(amount: number): any
  {
    // this.player.$ += amount;
  }

  spendGold(amount: number): any
  {
    // this.player.$ -= amount;
  }

  newPlayer(name: string = 'player'): void
  {
    this.player = new Player(name);
  }

  newOtherPlayer(name : string|null): void
  {
    if (name === null) {
      name = "other " + (this.others.length + 1);
    }
    this.others.push(new Player(name));
  }

}
