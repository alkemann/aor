import { Injectable } from '@angular/core';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player;
  others: Player[] = [];

  constructor() { }

  newPlayer(name: string = 'player'): void {
    this.player = new Player(name);
  }

  newOtherPlayer(name: string): void {
    this.others.push(new Player(name));
  }

}
