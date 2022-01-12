import { Component, OnInit } from '@angular/core';
import { Bid } from 'src/app/interfaces/bid';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'aor-turn-log',
  templateUrl: './turn-log.component.html',
  styleUrls: [ './turn-log.component.scss']
})
export class TurnLogComponent implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit(): void {}

}
