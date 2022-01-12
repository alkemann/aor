import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player;
  players: Player[] = [];

  constructor()
  {
    this.player = this.newPlayer();
    this.players.push(this.newPlayer("Steffen"));
    this.players.push(this.newPlayer("Erlend"));
    this.players.push(this.newPlayer("Eirik"));
    this.players.push(this.newPlayer("Tord"));
  }

  addGold(amount: number): any
  {
    // this.player.$ += amount;
  }

  spendGold(amount: number): any
  {
    // this.player.$ -= amount;
  }

  newPlayer(name : string = "player"): Player
  {
    return new Player(name);
  }

}
