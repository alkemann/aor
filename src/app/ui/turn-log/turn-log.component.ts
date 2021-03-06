import { Spending } from './../../interfaces/spending';
import { MiseryChange } from '../../interfaces/misery-change';
import { Router } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { RoundService } from './../../services/round.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'aor-turn-log',
  templateUrl: './turn-log.component.html',
  styleUrls: ['./turn-log.component.scss']
})
export class TurnLogComponent implements OnInit {

  constructor(
    private Router: Router,
    public GameService: GameService,
    public RoundService: RoundService,
    public PlayerService: PlayerService
  ) { }

  public miseryChange: MiseryChange;
  public spending: Spending;

  ngOnInit(): void {
    if (this.GameService.game === false) {
      this.Router.navigate(['start']);
      return;
    }
    this.spending = this.RoundService.spending();
    this.miseryChange = this.RoundService.miseryChange();
  }

  public buyTokens(n: number): void {
    this.RoundService.buyTokens(n);
    this.spending = this.RoundService.spending();
  }

  public buyMR(n: number): void {
    this.RoundService.buyRelief(n);
    this.miseryChange = this.RoundService.miseryChange();
    this.spending = this.RoundService.spending();
  }

  public adjustCash($: number): void {
    this.PlayerService.player.earn($);
    this.spending = this.RoundService.spending();
  }

  public adjustMisery(m: number): void {
    this.PlayerService.player.misery.incByLevel(m);
    this.miseryChange = this.RoundService.miseryChange();
  }

  public buyCard(): void {
    this.RoundService.buyCard();
    this.spending = this.RoundService.spending();
  }
  public toggleStabilization(): void {
    this.RoundService.payingStabilizationToggle();
    this.spending = this.RoundService.spending();
    this.miseryChange = this.RoundService.miseryChange();
  }

  public handSize(n: number): void {
    this.RoundService.adjustHand(n);
    this.spending = this.RoundService.spending();
    this.miseryChange = this.RoundService.miseryChange();
  }

  public abs(n:number): number {
    return Math.abs(n);
  }

}
