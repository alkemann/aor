import { PlayerService } from './../../services/player.service';
import { RoundService } from './../../services/round.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

type Spending = {
  onAdvances: number,
  onTokens: number,
  onCard: number,
  onHand: number,
  onMisary: number,
  total: number,
  savings: number,
  interest: number
  earnings: number,
  middleClass: number,
  nextTurn: number,
}

type MiseryChange = {
  increases: number,
  fromIncreases: number,
  fromAdvances: number,
  subtotal: number,
  fromCash: number,
  total: number,
  change: number
}

@Component({
  selector: 'aor-turn-log',
  templateUrl: './turn-log.component.html',
  styleUrls: ['./turn-log.component.scss']
})
export class TurnLogComponent implements OnInit {

  constructor(
    public GameService: GameService,
    public RoundService: RoundService,
    public PlayerService: PlayerService
  ) { }

  public miseryChange: MiseryChange;
  public spending: Spending;
  private onAdvances?: number;

  ngOnInit(): void {
    this.onAdvances = this.RoundService.advanceCost;
    this.spending = this.createSpending();
    this.miseryChange = this.createMiseryChange();
  }

  public buyTokens(n: number): void {
    this.RoundService.buyTokens(n);
    this.spending = this.createSpending();
  }

  public buyMR(n: number): void {
    this.RoundService.buyRelief(n);
    this.miseryChange = this.createMiseryChange();
    this.spending = this.createSpending();

  }

  public abs(n:number): number {
    return Math.abs(n);
  }

  createMiseryChange(): MiseryChange {
    const misery = this.PlayerService.player.misery;
    const increases = this.RoundService.mi;
    const fromIncreases = misery.miFromMoreLevels(increases);
    const fromAdvances = this.RoundService.reliefFromAdvances;
    const subtotal = fromIncreases - fromAdvances;
    const fromCash = this.RoundService.relief;
    const total = subtotal - fromCash;
    const change = misery.changeToSteps(total);
    return {
      increases,
      fromIncreases,
      fromAdvances,
      subtotal,
      fromCash,
      total,
      change
    }
  }

  createSpending(): Spending {
    const player = this.PlayerService.player;
    const onAdvances: number = this.onAdvances ?? 0;
    const onTokens = this.RoundService.tokens;
    const onMisary = this.RoundService.relief;
    const onHand = 0;
    const onCard = 0;
    const total = onAdvances + onTokens + onMisary + onHand + onCard;
    const savings = player.$ - total;
    const interest = savings; // player.owns("L")
    const earnings = 85; // from city count
    const middleClass = 10; // player.owns("Z")
    const nextTurn = savings + interest + earnings + middleClass;
    return {
      onAdvances,
      onTokens,
      onCard,
      onHand,
      onMisary,
      total,
      savings,
      interest,
      earnings,
      middleClass,
      nextTurn
    };
  }

}
