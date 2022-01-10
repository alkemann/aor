import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent implements OnInit {

  public players: string[];

  constructor() { 
    this.players = ["Erlend", "Tord", "Steffen", "Alexander", "Daniel"];
  }

  ngOnInit(): void {
  }

}
