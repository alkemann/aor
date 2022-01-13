import { GameService } from './services/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Age of Renaissance assistent';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.start();
  }
}
