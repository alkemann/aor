import { Injectable } from '@angular/core';
import { Player as PlayerInterface } from '../interfaces/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: PlayerInterface;
  players: PlayerInterface[] = [];

  constructor() {
    this.player = this.newPlayer();
  }

  addGold(amount: number): any {
    this.player.gold += amount;
  }

  spendGold(amount: number): any {
    this.player.gold -= amount;
  }

  newPlayer(): PlayerInterface {
    throw new Error('Function not implemented.');
  }
  
}
