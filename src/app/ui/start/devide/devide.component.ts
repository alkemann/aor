import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Player } from 'src/app/models/player';
import { Nation } from 'src/app/enums/nation';
import { NgForm } from '@angular/forms';

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

  private pk: number[] = [];
  private pn: string[] = [];

  constructor(
    private PlayerService: PlayerService,
    private GameService: GameService
  ) { }

  public get playerKeys(): any { return this.pk; }
  public get playerNames(): string[] { return this.pn; }

  ngOnInit(): void {
    this.pk = Array.from(Array(this.GameService.numberOfPlayers()-1).keys())
    this.pn = this.PlayerService.others.map(p=>p.name);
    let an: string[] = [
      'Venice',
      'Genoa',
      'Barcelona'
    ];
    const p:number = this.GameService.numberOfPlayers();
    if (p >= 4) an.push('Paris');
    if (p >= 5) an.push('London');
    if (p >= 6) an.push('Hamburg');
    this.availableNations = an;
  }

  public submit(form:NgForm): void {
    this.PlayerService.player.nation = form.value.myNation;
    const players = this.PlayerService.others;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.nation = form.value['player-nation-' + i];
      player.bid = form.value['player-bid-' + i];
    }
    this.done.emit();
  }

}
