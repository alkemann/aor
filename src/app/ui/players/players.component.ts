import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(
    private Router: Router,
    public GameService: GameService,
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    if (this.GameService.game === false) {
      this.Router.navigate(['start']);
      return;
    }
  }

}
