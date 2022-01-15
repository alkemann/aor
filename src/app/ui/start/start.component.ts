import { StartPhases } from './../../enums/start-phases';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  public phase: StartPhases;

  constructor() {
    this.phase = StartPhases.CREATE;
  }

  ngOnInit(): void {
  }

  public after(): void {
    this.phase += 1;
  }

  public start(): void {
    this.phase = 0;
  }
}
