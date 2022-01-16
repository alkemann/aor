import { PlayerService } from './../../services/player.service';
import { GameService } from 'src/app/services/game.service';
import { StartPhases } from './../../enums/start-phases';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nation } from 'src/app/enums/nation';

@Component({
  selector: 'aor-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public phase: StartPhases;

  constructor(
    private router: Router,
    private GameService: GameService,
    private PlayerService: PlayerService,
  ) {
    this.phase = StartPhases.CREATE;
  }

  ngOnInit(): void {
    this.quickTestSetup();
  }

  public quickTestSetup(): void {

    // create
    this.GameService.createGame({
      count: "4",
      sameTurnResearch: true
    });

    // names
    this.PlayerService.newPlayer("Alexander");
    this.PlayerService.newOtherPlayer("Steffen");
    this.PlayerService.newOtherPlayer("Tord");
    this.PlayerService.newOtherPlayer("Pål Antonsen");

    // bid
    this.PlayerService.player.payForBid(3);

    // devide
    this.PlayerService.player.nation = Nation.Venice;
    const players = this.PlayerService.others;
    players[0].nation = Nation.Barcelona;
    players[0].bid = 5;
    players[1].nation = Nation.Genova;
    players[1].bid = 2;
    players[2].nation = Nation.Paris;
    players[2].bid = 1;

    // tokens
    this.GameService.start(25);
    this.router.navigate(['turn']);
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
