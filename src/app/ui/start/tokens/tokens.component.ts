import { RoundService } from './../../../services/round.service';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-start-tokens',
  templateUrl: './tokens.component.html',
  styleUrls: ['./tokens.component.scss']
})
export class TokensComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    public PlayerService: PlayerService,
    private RoundService: RoundService,
    private GameService: GameService
  ) { }

  ngOnInit(): void { }

  public buyTokens(amount: string): void {
    const tokens = parseInt(amount);
    const player = this.PlayerService.player;
    player.spend = tokens;
    this.RoundService.startNextRound(tokens, player.$);
    this.GameService.start();
    this.done.emit();
  }
}
