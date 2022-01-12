import { Injectable } from '@angular/core';
import { Nation } from '../enums/nation';
import { Bid } from '../interfaces/bid';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game : Game;

  constructor() { 
    this.game = new Game();
  }

  public addBid(name: string, $: number, nation: Nation): void {
    this.game.addBid(name, $, nation);
  }

  public get bids() : Bid[] {
    return this.game.bids;
  }
}
