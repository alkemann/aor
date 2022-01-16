import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';
import { PlayerService } from './../../services/player.service';
import { RoundService } from './../../services/round.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.scss']
})
export class AdvancesComponent implements OnInit  {

  constructor(
    private Router: Router,
    public GameService: GameService,
    public advancesService: AdvancesService,
    public roundService: RoundService,
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    if (this.GameService.game === false) {
      this.Router.navigate(['start']);
      return;
    }
  }
}
