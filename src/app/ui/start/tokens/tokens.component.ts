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

  constructor(public PlayerService: PlayerService) { }

  ngOnInit(): void { }

  public buyTokens(tokens: string): void {
    this.done.emit(parseInt(tokens));
  }
}
