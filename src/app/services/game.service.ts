import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
import { Nation } from '../enums/nation';
import { Bid } from '../interfaces/bid';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private game : Game;

  constructor(private playerService:PlayerService)
  {
    this.game = new Game();
  }

  public start(): void
  {
    this.playerService.newPlayer("Alexander");
    this.playerService.newOtherPlayer("Steffen");
    this.playerService.newOtherPlayer("Erlend");
    this.playerService.newOtherPlayer("Eirik");
    this.playerService.newOtherPlayer("Tord");
    this.playerService.newOtherPlayer("Daniel");
    this.addBid('Alexander', 4, Nation.Barcelona);
    this.addBid('Steffen', 10, Nation.Paris);
    this.addBid('Daniel', 5, Nation.London);
    this.addBid('Tord', 5, Nation.Venice);
    this.addBid('Eirik', 5, Nation.Hamburg);
    this.addBid('Erlend', 0, Nation.Genova);

    this.playerService.player.toggle("I");
    this.playerService.player.toggle("J");
    this.playerService.player.toggle("K");
    this.playerService.player.toggle("L");
    this.playerService.player.toggle("X");
  }

  public addBid(name: string, $: number, nation: Nation): void
  {
    this.game.addBid(name, $, nation);
  }

  public get bids() : Bid[] { return this.game.bids; }
}
