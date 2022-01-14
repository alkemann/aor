import { PlayerService } from './../../services/player.service';
import { RoundService } from './../../services/round.service';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';

type Spending = {
  onAdvances: number,
  onCard: number,
  onHand: number,
  onMisary: number,
  subtotal: number,
  savings: number,
  interest: number
  earnings: number,
  middleClass: number,
  afterIncome: number,
  onTokens: number,
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

  public buyCard(): void {
    this.RoundService.buyCard();
    this.spending = this.createSpending();
  }
  public toggleStabilization(): void {
    this.RoundService.payingStabiliztion = ! this.RoundService.payingStabiliztion;
    this.spending = this.createSpending();
    this.miseryChange = this.createMiseryChange();
  }

  public cities(n: number): void {
    this.PlayerService.player.cities += n;
    this.spending = this.createSpending();
  }

  public handSize(n: number): void {
    this.RoundService.hand += n;
    this.spending = this.createSpending();
    this.miseryChange = this.createMiseryChange();
  }

  public abs(n:number): number {
    return Math.abs(n);
  }

  createMiseryChange(): MiseryChange {
    const misery = this.PlayerService.player.misery;
    let increases = this.RoundService.mi;
    if (this.RoundService.payingStabiliztion === false) {
      increases += misery.failedStabilization(this.RoundService.stabilizationCost);
    }
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
    const playerHasClass = player.owns("Z");
    const onAdvances: number = this.onAdvances ?? 0;
    const onMisary = this.RoundService.relief;
    const onHand = this.RoundService.stabilizationCost;
    const onCard = this.RoundService.card ? 10 : 0;
    let subtotal = onAdvances + onMisary + onCard;
    if (this.RoundService.payingStabiliztion) {
      subtotal += onHand;
    }
    const savings = player.$ - subtotal;
    const interest = player.owns("L") ? savings : 0;
    const earnings = player.cities * 5;
    const middleClass = playerHasClass? 10 : 0;
    const afterIncome = savings + interest + earnings + middleClass;
    const onTokens = this.RoundService.tokens;
    const nextTurn = afterIncome - onTokens;
    return {
      onAdvances,
      onCard,
      onHand,
      onMisary,
      subtotal,
      savings,
      interest,
      earnings,
      middleClass,
      afterIncome,
      onTokens,
      nextTurn
    };
  }

}
