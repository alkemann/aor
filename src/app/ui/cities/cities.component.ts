import { PlayerService } from './../../services/player.service';
import { Component, OnInit } from '@angular/core';
import { PROVINCES } from 'src/app/data/provinces';
import { Province } from 'src/app/interfaces/provice';
import { Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {

  public provinces: Province[] = PROVINCES;

  private cities: Set<string> = new Set<string>();

  constructor(
    private PlayerService: PlayerService,
    private Router: Router,
    private GameService: GameService
  ) { }

  ngOnInit(): void {
    if (this.GameService.game === false) {
      this.Router.navigate(['start']);
      return;
    }
    this.cities = new Set<string>(this.PlayerService.player.cities);
  }

  check(p:string): boolean {
    return this.cities.has(p);
  }

  changed(e:any): void {
    if (e.checked) {
      this.cities.add(e.source.name);
    } else {
      this.cities.delete(e.source.name);
    }
    this.PlayerService.player.cities = Array.from(this.cities);
  }

  toSymbol(n: number): string {
    switch (n) {
      case 1:
        return "❶";
        break;
      case 2:
        return "❷";
        break;
      case 3:
        return "❸";
        break;
      case 4:
        return "❹";
        break;
      case 5:
        return "❺";
        break;
      case 6:
        return "❻";
        break;
    }
    return '';
  }
}
