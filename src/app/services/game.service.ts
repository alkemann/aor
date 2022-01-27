import { RoundState, roundFromStateObject } from './../models/round';
import { playerFromStateObject, PlayerState, User, userFromStateObject } from './../models/player';
import { AdvancesService } from './advances.service';
import { Router } from '@angular/router';
import { RoundService } from './round.service';
import { PlayerService } from './player.service';
import { Injectable } from '@angular/core';
import { Game, gameFromStateObject } from '../models/game';
import { Rules } from '../interfaces/rules';
import { Score } from './../interfaces/score';

@Injectable({
  providedIn: 'root'
})
export class GameService {

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
    this.PlayerService.setBids();
    const player = this.PlayerService.player;
    player.spend(tokens);
    this.RoundService.startNextRound(tokens, player.$);
    this._game.startGame();
  }

  public nextTurn(): void {
    const spending = this.RoundService.spending();
    this.RoundService.apply();
    this.save();
    this.Router.navigate(['turn']);
  }

  public numberOfPlayers(): number { return this._game ? this._game.playerCount : 0; }

  public score(): Score {
    const player = this.PlayerService.player;
    const cash = player.$;
    let advances = 0;
    this.AdvancesService.all().forEach(k => {
      advances += player.owns(k.key) ? k.points : 0;
    });
    const misery = player.misery.value;
    const total = cash + advances - misery;
    return {cash, advances, misery, total};
  }

  public restart(): void {
    this._game = null;
    this.RoundService.restart();
    this.PlayerService.restart();
  }

  public save(): void {
    console.warn("Storing game state in local storage!");
    if (this._game) {
      localStorage.setItem('game', JSON.stringify(this._game.makeStateObject()));
    }
    if (this.PlayerService.player) {
      localStorage.setItem('user', JSON.stringify(this.PlayerService.player.makeStateObject()));
    }
    if (this.PlayerService.others.length > 0) {
      const others = this.PlayerService.others.map( o => o.makeStateObject() );
      localStorage.setItem('others', JSON.stringify(others));
    }
    if (this.RoundService.rounds.length > 0) {
      const rounds = this.RoundService.rounds.map( r => r.makeStateObject() );
      localStorage.setItem('rounds', JSON.stringify(rounds));
    }
  }

  public load(): void {
    console.warn("Loading game state from local storage!");

    const gameState = JSON.parse(localStorage.getItem('game') ?? 'false');
    if (gameState) {
      this._game = gameFromStateObject(gameState);
    } else  {
      this.loadFailed(" No game state"); return;
    }

    const playerState = JSON.parse(localStorage.getItem('user') ?? 'false');
    let player: User;
    if (playerState) {
      this.PlayerService.player = player = userFromStateObject(playerState); new User(playerState.name);
    } else {
      this.loadFailed("No user state"); return;
    }

    const othersState = JSON.parse(localStorage.getItem('others') ?? 'false');
    if (othersState) {
      this.PlayerService.others = othersState.map( (oState: PlayerState) => playerFromStateObject(oState) );
    } else {
      this.loadFailed("No others' state"); return;
    }
    this.PlayerService.setBids();

    const roundsState = JSON.parse(localStorage.getItem('rounds') ?? 'false');
    if (roundsState) {
      this.RoundService.loadRounds(roundsState.map( (rState: RoundState) => roundFromStateObject(rState) ));
    } else {
      this.loadFailed("No rounds' state"); return;
    }

    this.Router.navigate(['turn']);
  }

  private loadFailed(msg: string): void {
    console.error(`LOAD FAILED: ${msg}`);
    this.restart();
  }
}
