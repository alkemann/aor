import { GameService } from 'src/app/services/game.service';
import { Score } from './../../interfaces/score';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aor-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.scss']
})
export class EndComponent implements OnInit {

  public score: Score = {cash: 0, advances: 0, misery: 0, total: 0};

  constructor(
    private Router: Router,
    private GameService: GameService
  ) { }

  ngOnInit(): void {
    if (this.GameService.game === false) {
      this.Router.navigate(['start']);
      return;
    }
    this.score = this.GameService.score();
  }

  public newGame(): void {
    this.GameService.restart();
    this.Router.navigate(['start']);
  }

}
