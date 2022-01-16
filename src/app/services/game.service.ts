import { RoundService } from './round.service';
import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Rules } from '../interfaces/rules';
import { Bid } from '../interfaces/bid';

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

  constructor(
    private RoundService: RoundService,
    private PlayerService: PlayerService
  ) {}

  public createGame(setupForm:any): any
  {
    const players: number = parseInt(setupForm.count);
    const rules: Rules = {
      sameTurnResearch: setupForm.sameTurnResearch
    }
    this._game = new Game(players, rules);
  }

  public start(tokens: number): void {

    const player = this.PlayerService.player;
    player.spend = tokens;
    this.RoundService.startNextRound(tokens, player.$);
    this.round = {
      i: 1,
      total: player.$,
      tokens,
      cash:player.$
    };
    this._game.startGame();
  }

  public nextTurn(): void {
    const spending = this.RoundService.spending;
    this.round = {
      i: this.RoundService.round,
      total: spending.startedWith,
      tokens: spending.onTokens,
      cash: spending.nextTurn
    };
    this.RoundService.apply();
  }

  public get numberOfPlayers(): number { return this._game.playerCount; }

  public get bids(): any[] {
    const bids: Bid[] = [];
    const player = this.PlayerService.player;
    bids.push({name: player.name, $: player.bid, nation: player.nation});
    this.PlayerService.others.forEach(p => bids.push({
      name: p.name, $: p.bid, nation: p.nation
    }));
    return bids;
  }

  public set round(r: Round) {
    this.rounds.push(r)
  }
}
