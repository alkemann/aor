import { environment } from './../../../environments/environment';
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
    if (environment.testSetup) {
      this.quickTestSetup();
    }
  }

  public quickTestSetup(): void {

    // create
    this.GameService.createGame({
      count: "5",
      sameTurnResearch: true
    });

    // names
    this.PlayerService.newPlayer("Alexander");
    this.PlayerService.newOtherPlayer("Tord");
    this.PlayerService.newOtherPlayer("Erlend");
    this.PlayerService.newOtherPlayer("Steffen");
    this.PlayerService.newOtherPlayer("Daniel");

    // bid
    const player = this.PlayerService.player;
    player.payForBid(4);

    // devide
    this.PlayerService.player.nation = Nation.Paris;
    const players = this.PlayerService.others;
    players[0].nation = Nation.Barcelona;
    players[0].bid = 3;
    players[1].nation = Nation.Venice;
    players[1].bid = 5;
    players[2].nation = Nation.London;
    players[2].bid = 2;
    players[3].nation = Nation.Genova;
    players[3].bid = 4;

    // tokens
    this.GameService.start(25);
    this.router.navigate(['turn']);

    // add some fake turns
    player.earn = 400;
    player.misery.incByLevel(4);
    player.add("A");
    player.add("B");

    player.add("E");

    player.add("I");
    player.add("J");
    player.add("K");
    player.add("L");

    player.add("N");

    player.add("R");

    player.add("V");
    player.add("Z");
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
