import { PlayerService } from './player.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Injectable } from '@angular/core';
import { Advance } from '../interfaces/advance';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private buyingThisRound: Set<string> = new Set();

  constructor(
    private advancesService: AdvancesService,
    private playerService: PlayerService
  ) { }

  public get advanceCost(): number
  {
    let out = 0;
    Array.from(this.buyingThisRound).forEach(
      k => out += this.cost(this.advancesService.byKey(k))
    );
    return out;
  }

  public cost(adv: Advance): number
  {
    let cost = adv.cost;
    cost -= (adv.researchable && this.playerHasIR) ? 10 : 0;
    this.advancesService
      .allByCategory(adv.category)
      .forEach(a => cost -= this.player.owns(a.key) ? a.credit : 0 );

    return Math.max(0, cost);
  }

  get player(): Player { return this.playerService.player; }

  public get playerHasIR(): boolean
  {
    // Remove buyCheck to not allow Institutional Research same round
    return this.playerService.player.owns("X") || this.buyCheck("X");
  }

  public buyCheck(adv: string): boolean
  {
    return this.buyingThisRound.has(adv);
  }

  public buyAdvanceToggle(adv: string): boolean
  {
    if (this.buyingThisRound.has(adv)) {
      this.buyingThisRound.delete(adv);
    } else {
      this.buyingThisRound.add(adv);
    }
    return false;
  }
}
