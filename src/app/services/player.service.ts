import { Injectable } from '@angular/core';

export interface Player {
  gold: number,
  bought: string[]

}

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  player: Player;
  players: Player[] = [];

  constructor() {
    this.player = this.newPlayer();
  }

  addGold(amount: number): any {
    this.player.gold += amount;
  }

  spendGold(amount: number): any {
    this.player.gold -= amount;
  }

  newPlayer(): Player {
    throw new Error('Function not implemented.');
  }
  
}
