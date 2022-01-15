import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
import { Nation } from '../enums/nation';
import { Game } from '../models/game';
import { Rules } from '../interfaces/rules';

type Round = {
  i: number,
  total: number,
  tokens: number,
  cash:number
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _game: Game;
  public get game(): boolean { return this._game instanceof Game && this._game.started; }

  public rounds: Round[] = [];

  constructor(private playerService: PlayerService) {
  }

  public createGame(setupForm:any): any
  {
    const players: number = parseInt(setupForm.count);
    const rules: Rules = {
      sameTurnResearch: setupForm.sameTurnResearch
    }
    this._game = new Game(players, rules);
    console.log("Game setup!");
  }

  public start(): void {
    this.playerService.newPlayer("Alexander");
    this.playerService.newOtherPlayer("Steffen");
    this.playerService.newOtherPlayer("Erlend");
    this.playerService.newOtherPlayer("Eirik");
    this.playerService.newOtherPlayer("Tord");
    this.playerService.newOtherPlayer("Daniel");

    // this.playerService.player.$ = 140;
    // this.playerService.player.toggle("I");
    // this.playerService.player.toggle("J");
    // this.playerService.player.toggle("K");
    // this.playerService.player.toggle("L");
    // this.playerService.player.toggle("V");
    // this.playerService.player.toggle("Z");
    // this.playerService.player.toggle("X");
  }

  public get numberOfPlayers(): number { return this._game.playerCount; }

  public earnings(cities: number): number {
    const pl = this.numberOfPlayers;
    return 15 + (cities * pl);
  }

  public get bids(): any[] { return []; }

  public set round(r: Round) {
    this.rounds.push(r)
  }
}
