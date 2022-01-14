import { PlayerService } from './player.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Injectable } from '@angular/core';
import { Advance } from '../interfaces/advance';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  private r: number = 1;
  public get round(): number { return this.r; };

  public payingStabiliztion: boolean = true;
  public hand: number = 0;
  private buyingThisRound: Set<string> = new Set();
  private _boughtCard: boolean = false;
  private _relief: number = 0;
  private _boughtTokens: number = 0;
  public get exploreTokens(): number { return this._boughtTokens; };
  private _tokens: number = 0;
  public get tokens(): number { return this._tokens; }

  constructor(
    private AdvancesService: AdvancesService,
    private PlayerService: PlayerService
  ) { }

  public get advanceCost(): number {
    let out = 0;
    Array.from(this.buyingThisRound).forEach(
      k => out += this.cost(this.AdvancesService.byKey(k))
    );
    return out;
  }

  public cost(adv: Advance): number {
    let cost = adv.points;
    cost -= (adv.researchable && this.playerHasIR) ? 10 : 0;
    this.AdvancesService
      .allByCategory(adv.category)
      .forEach(a => cost -= this.PlayerService.player.owns(a.key) ? a.credit : 0);

    return Math.max(0, cost);
  }

  public get playerHasIR(): boolean {
    // Remove buyCheck to not allow Institutional Research same round
    return this.PlayerService.player.owns("X") || this.buyCheck("X");
  }

  public buyCard() {
    if (this.PlayerService.player.owns("V")) {
      this._boughtCard = !this._boughtCard;
    } else {
      throw new Error("Buyging card without Urban Ascendency!");
    }
  }
  public get card(): boolean { return this._boughtCard; }

  public get stabilizationCost(): number {
    let out: number = 0;
    for (let h = 1; h <= this.hand; h++) {
      out += h;
    }
    if (this.PlayerService.player.owns("Z")) {
      out = Math.ceil( out / 2 );
    }
    return out;
  }

  public get statibilizationFailurePrice(): number {
    return this.PlayerService.player.misery.failedStabilization(this.stabilizationCost);
  }

  public buyRelief(n: number) {
    this._relief += n;
    this._relief = Math.max(0, this._relief);
  }

  public get relief(): number {
    return this._relief;
  }

  public buyTokens(n: number): void {
    const want = this._tokens + n;
    this._tokens = Math.min(36, Math.max(0, want));
  }

  public buyCheck(adv: string): boolean {
    return this.buyingThisRound.has(adv);
  }

  public buyAdvanceToggle(adv: string): boolean {
    if (this.buyingThisRound.has(adv)) {
      this.buyingThisRound.delete(adv);
    } else {
      this.buyingThisRound.add(adv);
    }
    return false;
  }

  public get reliefFromAdvances(): number {
    let out: number = 0;
    this.buyingThisRound.forEach(k => {
      const a: Advance = this.AdvancesService.byKey(k);
      out += a.relief
    });
    return out;
  }

  public get mi(): number {
    let out: number = 0;
    this.buyingThisRound.forEach(k => out += this.AdvancesService.byKey(k).misery ? 1 : 0);
    return out;
  }

  public get advances(): Advance[] {
    let out: Advance[] = [];
    this.buyingThisRound.forEach(
      k => {
        let a = this.AdvancesService.byKey(k);
        a.cost = this.cost(a);
        out.push(a);
      }
    )
    return out;
  }

  private startNextRound(tokens: number): void {
    this.r++;
    this._tokens = 0;
    this._relief = 0;
    this.payingStabiliztion = false;
    this._boughtCard = false;
    this._boughtTokens = tokens;
    this.buyingThisRound = new Set();
  }

  public apply(): void {
    const player = this.PlayerService.player;
    this.buyingThisRound.forEach(k => player.add(k));
    player.spend = this.advanceCost;
    player.earn = 100;
  }
}
