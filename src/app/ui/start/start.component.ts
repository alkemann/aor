import { GameService } from 'src/app/services/game.service';
import { StartPhases } from './../../enums/start-phases';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'aor-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public phase: StartPhases;

  constructor(
    private router: Router,
    private GameService: GameService
  ) {
    this.phase = StartPhases.CREATE;
  }

  ngOnInit(): void {
  }

  public after(): void {
    this.phase += 1;
  }

  public start(tokens:number): void {
    this.phase = StartPhases.CREATE; // for next
    this.GameService.start(tokens);
    this.router.navigate(['turn']);
  }
}
