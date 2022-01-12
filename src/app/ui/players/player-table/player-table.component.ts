import { PlayerService } from './../../../services/player.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'aor-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  @Input() player: Player;

  constructor(
    public advanceService: AdvancesService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void { }

  public touched(key:string) {
    console.log(this.player.name +" toggle "+ key);
  }

}
