import { GameService } from 'src/app/services/game.service';
import { PlayerService } from './../../../services/player.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Nation } from 'src/app/enums/nation';
import { FormControl, NgForm } from '@angular/forms';


interface SelectArr {
  [key: string]: string;
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

  disableSelect = new FormControl(false);

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

  private keys: string[] = ['user', '0', '1', '2'];
  private selectedCity: SelectArr = {'user': '', '0': '', '1': ''};

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
    }
    if (p >= 5) {
      an.push('London');
      this.keys.push('3');
      this.selectedCity['3'] = '';
    }
    if (p >= 6) {
      an.push('Hamburg');
      this.keys.push('4');
      this.selectedCity['4'] = '';
    }
    this.allNations = an;
    this.availableNations = new Set<string>(an);
  }


  public submit(form:NgForm): void {
    console.log(this.selectedCity);
    for (let i = 0; i < this.keys.length; i++) {
      const element = this.keys[i];
      if (this.selectedCity[i] === '') return;

    }
    this.PlayerService.player.nation = form.value.myNation;
    this.PlayerService.player.cities = [this.PlayerService.player.nation];
    const players = this.PlayerService.others;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.nation = form.value['player-nation-' + i];
      player.bid = form.value['player-bid-' + i];
    }
    this.done.emit();
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

  // public drop(event: CdkDragDrop<string[]>): void {
  //   console.log(event);
  //   moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  // }

}
