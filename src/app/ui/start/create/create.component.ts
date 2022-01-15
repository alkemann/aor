import { GameService } from 'src/app/services/game.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

interface Setup {
  count: string,
  sameTurnResearch: string,
}

@Component({
  selector: 'ui-start-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  @Output() done: EventEmitter<any> = new EventEmitter<any>();

  setup: Setup = {
    count: "3",
    sameTurnResearch: "yes"
  }

  constructor(public GameService: GameService) { }

  ngOnInit(): void {
  }

  public submit(): void {
    this.GameService.createGame(this.setup);
    this.done.emit();
  }

}
