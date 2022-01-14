import { RoundService } from './../../../services/round.service';
import { Advance } from './../../../interfaces/advance';
import { PlayerService } from './../../../services/player.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AdvancesService } from 'src/app/services/advances.service';

type Sym = {
  [key:string] : string
}

const symbols:Sym = {
  exploration: '✬',
  religion: '✞',
  communications: '✍',
  science: '✌',
  civics: '➶',
  commerce: '☞',
};

@Component({
  selector: 'aor-adv-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() category: string ;

  public advances: Advance[] = [];
  public total: number = 0;

  constructor(
    private advancesService: AdvancesService,
    public playerService: PlayerService,
    public roundService: RoundService
  ) {}

  ngOnInit(): void
  {
    this.advances = this.advancesService.allByCategory(this.category);
    this.advances.forEach( a => this.total += a.cost );
  }

  public symbol(category: string): string { return symbols[category]; }

}
