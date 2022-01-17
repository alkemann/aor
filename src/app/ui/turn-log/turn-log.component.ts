import { Router } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { MiseryChange, RoundService, Spending } from './../../services/round.service';
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
    this.spending = this.RoundService.spending;
    this.miseryChange = this.RoundService.miseryChange;
  }

  public buyTokens(n: number): void {
    this.RoundService.buyTokens(n);
    this.spending = this.RoundService.spending;
  }

  public buyMR(n: number): void {
    this.RoundService.buyRelief(n);
    this.miseryChange = this.RoundService.miseryChange;
    this.spending = this.RoundService.spending;
  }

  public adjustCash($: number): void {
    this.PlayerService.player.earn = $;
    this.spending = this.RoundService.spending;
  }

  public adjustMisery(m: number): void {
    this.PlayerService.player.misery.incByLevel(m);
    this.miseryChange = this.RoundService.miseryChange;
  }

  public buyCard(): void {
    this.RoundService.buyCard();
    this.spending = this.RoundService.spending;
  }
  public toggleStabilization(): void {
    this.RoundService.payingStabiliztion = ! this.RoundService.payingStabiliztion;
    this.spending = this.RoundService.spending;
    this.miseryChange = this.RoundService.miseryChange;
  }

  public cities(n: number): void {
    this.PlayerService.player.cities += n;
    this.spending = this.RoundService.spending;
  }

  public handSize(n: number): void {
    this.RoundService.hand += n;
    this.RoundService.hand = Math.max(0, this.RoundService.hand);
    this.spending = this.RoundService.spending;
    this.miseryChange = this.RoundService.miseryChange;
  }

  public abs(n:number): number {
    return Math.abs(n);
  }

}
