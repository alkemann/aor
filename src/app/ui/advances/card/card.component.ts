import { Advance } from './../../../interfaces/advance';
import { PlayerService } from './../../../services/player.service';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() buyCallback: any;
  @Input() buyCheck: any;

  public advances: Advance[] = [];
  public total: number = 0;
  public researchable: boolean = false;

  constructor(
    private advancesService: AdvancesService,
    public playerService: PlayerService
  ) {}

  ngOnInit(): void
  {
    this.advances = this.advancesService.allByCategory(this.category);
    this.advances.forEach( a => this.total += a.cost );
    this.researchable = this.advances[0].researchable;
  }

  public get playerHasIR(): boolean { return this.playerService.player.owns("X"); }
  public symbol(category: string): string { return symbols[category]; }
  public owns(key: string): boolean { return this.playerService.player.owns(key); }
  public cost(adv: Advance): number
  {
    let cost = adv.cost;
    cost -= (this.researchable && this.playerHasIR) ? 10 : 0;
    this.advancesService
      .allByCategory(adv.category)
      .forEach(a => cost -= this.owns(a.key) ? a.credit : 0 );

    return Math.max(0, cost);
  }


}
