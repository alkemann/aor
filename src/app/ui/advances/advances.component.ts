import { AdvancesService } from 'src/app/services/advances.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'aor-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.scss']
})
export class AdvancesComponent implements OnInit {

  public cashAvailable: number = 100;

  constructor(public advancesService: AdvancesService) { }

  ngOnInit(): void {
    this.buyingThisRound = new Set();
  }

  buyingThisRound: Set<string> = new Set();

  public buyCheck(adv: string): boolean
  {
    return this.buyingThisRound.has(adv);
  }

  public buyCallback(adv: string): boolean
  {

    if (this.buyingThisRound.has(adv)) {
      this.buyingThisRound.delete(adv);
    } else {
      this.buyingThisRound.add(adv);
    }
    return false;
  }
}
