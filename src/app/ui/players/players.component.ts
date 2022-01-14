import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  constructor(public playerService: PlayerService) { }

  ngOnInit(): void { }

}
