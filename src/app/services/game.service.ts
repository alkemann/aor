import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
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
  }

  public start(): void {
    this._game.startGame();
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
