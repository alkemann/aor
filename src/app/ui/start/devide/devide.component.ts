import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Nation } from 'src/app/enums/nation';
import { FormControl, NgForm } from '@angular/forms';


interface SelectArr {
  [key: string]: string;
}
interface BidsArr {
  [key: string]: number;
}

@Component({
  selector: 'ui-start-devide',
  templateUrl: './devide.component.html',
  styleUrls: ['./devide.component.scss']
})
export class DevideComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  public availableNations: Set<string>;
  public allNations: string[];

  public myNation: Nation;
  public otherNations: Nation[];

  private pk: number[] = [];
  private pn: string[] = [];

  constructor(
    private PlayerService: PlayerService,
    private GameService: GameService,
  ) { }

  public get playerKeys(): any { return this.pk; }
  public get playerNames(): string[] { return this.pn; }

  private keys: string[] = ['user', '0', '1'];
  private selectedCity: SelectArr = {'user': '', '0': '', '1': ''};
  private bids : BidsArr = {'0':0, '1': 0};


  ngOnInit(): void {
    this.pk = Array.from(Array(this.GameService.numberOfPlayers()-1).keys())
    this.pn = this.PlayerService.others.map(p=>p.name);
    let an: string[] = [
      'Venice',
      'Genoa',
      'Barcelona'
    ];
    const p:number = this.GameService.numberOfPlayers();
    if (p >= 4) {
      an.push('Paris');
      this.keys.push('2');
      this.selectedCity['2'] = '';
      this.bids['2'] = 0;
    }
    if (p >= 5) {
      an.push('London');
      this.keys.push('3');
      this.selectedCity['3'] = '';
      this.bids['3'] = 0;
    }
    if (p >= 6) {
      an.push('Hamburg');
      this.keys.push('4');
      this.selectedCity['4'] = '';
      this.bids['4'] = 0;
    }
    this.allNations = an;
    this.availableNations = new Set<string>(an);
  }

  public submit(form:NgForm): void {
    for (let i = 0; i < this.keys.length; i++) {
      const element = this.keys[i];
      if (this.selectedCity[i] === '') return;

    }
    const startNation = Nation[this.selectedCity['user'] as keyof typeof Nation];
    this.PlayerService.player.setStartCity(startNation);
    const players = this.PlayerService.others;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.nation = Nation[this.selectedCity[i] as keyof typeof Nation];
      player.bid = this.bids[i];
    }
    this.done.emit();
  }

  bidFor($event: any, key: any): any {
    this.bids[key] = $event.value
  }

  selectedFor($event: any, key: string): any {
    this.selectedCity[key] = $event.value;
    this.availableNations = new Set(this.allNations);
    this.keys.forEach( k =>  {
      if (this.selectedCity[k] != '') {
        this.availableNations.delete(this.selectedCity[k])
      }
    });
    return true;
  }

}
