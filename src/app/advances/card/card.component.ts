import { AdvancesService } from './../../advances.service';
import { Component, Input, OnInit } from '@angular/core';
import { Advance } from 'src/app/advances.service';
// import * as data from '/data/advances.json'

@Component({
  selector: 'app-adv-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  public advances: Advance[] = [];
  @Input() category: string  = '';
  public total: number = 0;
  public playerHasIR: boolean = false;
  public researchable: boolean = false;

  constructor(private service: AdvancesService) {}

  ngOnInit(): void {
    this.advances = this.service.allByCategory(this.category);
    this.advances.forEach( a => this.total += a.cost );
    this.researchable = this.advances[0].researchable;
  }

}
