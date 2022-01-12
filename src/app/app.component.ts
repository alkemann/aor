import { GameService } from './services/game.service';
import { Component, OnInit } from '@angular/core';
import { Nation } from './enums/nation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Age of Renaissance assistent';

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.addBid('Alex', 4, Nation.Barcelona);
    this.gameService.addBid('Steffen', 10, Nation.Paris);
    this.gameService.addBid('Daniel', 5, Nation.London);
    this.gameService.addBid('Tord', 5, Nation.Venice);
    this.gameService.addBid('Erlend', 0, Nation.Genova);
  }
}
