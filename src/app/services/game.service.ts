import { AdvancesService } from './advances.service';
import { Router } from '@angular/router';
import { RoundService } from './round.service';
import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
import { Game } from '../models/game';
import { Rules } from '../interfaces/rules';
import { Bid } from '../interfaces/bid';
import { Score } from './../interfaces/score';
import { Round } from '../interfaces/round';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _bids: Bid[];
  private _game: Game|null;
  public get game(): boolean { return this._game instanceof Game && this._game.started; }


  constructor(
    private Router: Router,
    private RoundService: RoundService,
    private PlayerService: PlayerService,
    private AdvancesService: AdvancesService,
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
    if (!this._game) {
      console.error("Game started before created!");
      return;
    }
    const player = this.PlayerService.player;

    const bids: Bid[] = [];
    bids.push({name: player.name, $: player.bid, nation: player.nation});
    this.PlayerService.others.forEach(p => bids.push({
      name: p.name, $: p.bid, nation: p.nation
    }));
    bids.sort( (a,b) => a.$ < b.$ ? 1 : -1 );
    this._bids = bids;

    player.spend = tokens;
    this.RoundService.startNextRound(tokens, player.$);
    this._game.startGame();
  }

  public nextTurn(): void {
    const spending = this.RoundService.spending();
    this.RoundService.apply();
    this.Router.navigate(['turn']);
  }

  public numberOfPlayers(): number { return this._game ? this._game.playerCount : 0; }

  public get bids(): any[] {
    return this._bids;
  }

  public score(): Score {
    const player = this.PlayerService.player;
    const cash = player.$;
    let advances = 0;
    this.AdvancesService.all().forEach(k => {
      advances += player.owns(k.key) ? k.points : 0;
    });
    const misery = player.misery.level;
    const total = cash + advances - misery;
    return {cash, advances, misery, total};
  }

  public restart(): void {
    this._bids = [];
    this._game = null;
    this.RoundService.restart();
    this.PlayerService.restart();
  }
}
