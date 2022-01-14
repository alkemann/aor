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
  styleUrls: [ './turn-log.component.scss']
})
export class TurnLogComponent implements OnInit {

  constructor(
    public GameService: GameService,
    public RoundService: RoundService,
    public PlayerService: PlayerService
  ) { }

  public spending: Spending;

  ngOnInit(): void {
    const onAdvances = this.RoundService.advanceCost;
    const onTokens = this.RoundService.tokens;
    const onMisary = 0;
    const onHand = 0;
    const onCard = 0;
    const total = onAdvances + onTokens + onMisary + onHand + onCard;
    const savings = this.PlayerService.player.$ - total;
    this.spending = {
      onAdvances,
      onTokens,
      onCard,
      onHand,
      onMisary,
      total,
      savings
    }
  }

}
