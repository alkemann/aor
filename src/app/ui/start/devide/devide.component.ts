import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Nation } from 'src/app/enums/nation';

@Component({
  selector: 'ui-start-devide',
  templateUrl: './devide.component.html',
  styleUrls: ['./devide.component.scss']
})
export class DevideComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  public availableNations: string[];

  public myNation: Nation;
  public otherNations: Nation[];

  constructor(
    private PlayerService: PlayerService,
    private GameService: GameService
  ) { }

  public get players(): Player[] { return this.PlayerService.others; }

  ngOnInit(): void {

    let an: string[] = [
      'Venice',
      'Genoa',
      'Barcelona'
    ];
    const p:number = this.GameService.numberOfPlayers;
    if (p >= 4) an.push('Paris');
    if (p >= 5) an.push('London');
    if (p >= 6) an.push('Hamburg');
    this.availableNations = an;
  }

  public submit(): void {
    // this.done.emit();
  }

}
