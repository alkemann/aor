import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'aor-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {

  @Input() name: string = 'ss';

  constructor() { }

  ngOnInit(): void {
  }

}
