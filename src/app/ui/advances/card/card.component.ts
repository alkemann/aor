import { Component, Input, OnInit } from '@angular/core';
import { Advance } from 'src/app/interfaces/advance';
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
  public playerHasIR: boolean = false;
  public researchable: boolean = false;

  constructor(private service: AdvancesService) {}

  ngOnInit(): void
  {
    this.advances = this.service.allByCategory(this.category);
    this.advances.forEach( a => this.total += a.cost );
    this.researchable = this.advances[0].researchable;
  }

  public symbol(category: string): string
  {
    return symbols[category];
  }
}
