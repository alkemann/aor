import { PlayerService } from './../../../services/player.service';
import { GameService } from 'src/app/services/game.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ui-start-names',
  templateUrl: './names.component.html',
  styleUrls: ['./names.component.scss']
})
export class NamesComponent implements OnInit {


  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  public myName: string;
  public playerNames: any[] = [];

  constructor(
    public GameService: GameService,
    public PlayerService: PlayerService
  ) {
  }

  ngOnInit(): void {
  }

  public get nrp(): number { return this.GameService.numberOfPlayers; }

  public submit(): void {
    // extract names and create players
    this.PlayerService.newPlayer(this.myName);
    this.playerNames.forEach( n => this.PlayerService.newOtherPlayer(n));
    this.done.emit();
  }

}
