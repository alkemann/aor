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
  savings: number
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

  public spending: Spending;
  private onAdvances?: number;

  ngOnInit(): void {
    this.onAdvances = this.RoundService.advanceCost;
    this.spending = this.createSpending();
  }

  public buyTokens(n: number): void {
    this.RoundService.buyTokens(n);
    this.spending = this.createSpending();
  }

  public buyMR(n: number): void {
    // this.RoundService.
  }

  createSpending(): Spending {
    const onAdvances: number = this.onAdvances ?? 0;
    const onTokens = this.RoundService.tokens;
    const onMisary = 0;
    const onHand = 0;
    const onCard = 0;
    const total = onAdvances + onTokens + onMisary + onHand + onCard;
    const savings = this.PlayerService.player.$ - total;
    return {
      onAdvances,
      onTokens,
      onCard,
      onHand,
      onMisary,
      total,
      savings
    };
  }

}
