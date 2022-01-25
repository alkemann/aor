import { Spending } from './../interfaces/spending';
import { PlayerService } from './player.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { Injectable } from '@angular/core';
import { Advance } from '../interfaces/advance';
import { MiseryChange } from '../interfaces/misery-change';
import { RoundLog } from '../interfaces/round-log';
import { User } from '../models/player';
import { Round } from '../models/round';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  protected r: Round;
  public get round(): number { return this.r.i; };
  public rounds: Round[] = [];

  constructor(
    private AdvancesService: AdvancesService,
    private PlayerService: PlayerService,
  ) { }

  public get advanceCost(): number {
    let out = 0;
    Array.from(this.r.buyingAdvances).forEach(
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
    return this.PlayerService.player.owns("X") || this.r.buyCheck("X");
  }

  public buyCard() {
    if (this.PlayerService.player.owns("V")) {
      this.r.card = !this.r.card;
    } else {
      throw new Error("Buyging card without Urban Ascendency!");
    }
  }
  public get card(): boolean { return this.r.card; }

  public get stabilizationCost(): number {
    let out: number = 0;
    for (let h = 1; h <= this.r.hand; h++) {
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

  public get relief(): number {
    return this.r.relief;
  }

  public get reliefFromAdvances(): number {
    let out: number = 0;
    this.r.buyingAdvances.forEach(k => {
      const a: Advance = this.AdvancesService.byKey(k);
      out += a.relief
    });
    return out;
  }

  public get mi(): number {
    let out: number = 0;
    this.r.buyingAdvances.forEach(k => out += this.AdvancesService.byKey(k).misery ? 1 : 0);
    return out;
  }

  public get advances(): Advance[] {
    let out: Advance[] = [];
    this.r.buyingAdvances.forEach(
      k => {
        let a = this.AdvancesService.byKey(k);
        a.cost = this.cost(a);
        out.push(a);
      }
    )
    return out;
  }

  public buyCheck(adv: string): boolean { return this.r.buyCheck(adv); }
  public buyTokens(n: number): void { return this.r.buyTokens(n); }
  public buyRelief(n: number) { return this.r.buyRelief(n); }
  public buyAdvanceToggle(adv: string): void { return this.r.buyAdvanceToggle(adv); }
  public payingStabilizationToggle(): void { this.r.stabiliztion = ! this.r.stabiliztion; }
  public adjustHand(n: number): void {
    this.r.hand += n;
    this.r.hand = Math.max(0, this.r.hand);
  }
  public get handSize(): number { return this.r.hand; }
  public get payingStabilization(): boolean { return this.r.stabiliztion; }
  public get buyingTokens(): number { return this.r.buyingTokens; }
  public get exploreTokens(): number { return this.r.tokens; }

  public roundLog(): RoundLog[] {
    const rounds: RoundLog[] = this.rounds.map( (r: Round) => {
      return {
        i: r.i,
        total: r.money,
        tokens: r.tokens,
        cash: r.endCash,
      };
    });
    return rounds;
  }

  public restart(): void {
    this.r = new Round(0, 40, 0);
  }

  public startNextRound(tokens: number, cash: number): void {
    const prev = this.r;
    let i = 0;
    let hand = 1;
    if (prev) {
      prev.endCash = cash;
      i = prev.i + 1;
      hand += prev.hand;
    }
    this.r = new Round(i, cash, tokens, hand);
    this.rounds.push(this.r);
  }

  public apply(): void {
    const player = this.PlayerService.player;
    this.r.buyingAdvances.forEach(k => player.add(k));
    const spending = this.spending();
    player.$ = spending.nextTurn;
    const miseryChange = this.miseryChange()
    player.misery.incByLevel(miseryChange.change);
    this.startNextRound(spending.onTokens, spending.nextTurn);
  }

  public miseryChange(): MiseryChange {
    const misery = this.PlayerService.player.misery;
    let increases = this.mi;
    if (this.r.stabiliztion === false) {
      increases += misery.failedStabilization(this.stabilizationCost);
    }
    if (this.r.buyingAdvances.has("K")) {
      increases -= 1;
    }
    const fromIncreases = misery.miFromMoreLevels(increases);
    const fromAdvances = this.reliefFromAdvances;
    const subtotal = fromIncreases - fromAdvances;
    const fromCash = this.relief;
    const total = subtotal - fromCash;
    let change = misery.changeToSteps(total);
    change = Math.max(change, (-1 * this.PlayerService.miseryReliefLevels));
    return {
      increases,
      fromIncreases,
      fromAdvances,
      subtotal,
      fromCash,
      total,
      change
    }
  }

  private get numberOfPlayers(): number {
    return this.PlayerService.others.length + 1;
  }

  private earnings(cities: number): number {
    const pl = this.numberOfPlayers;
    return 15 + (cities * pl);
  }

  public spending(): Spending {
    const player = this.PlayerService.player;
    if (player instanceof User === false) {
      throw new Error("NO PLAYER");
    }
    const playerHasClass = this.r.buyingAdvances.has("Z") || player.owns("Z");
    const onAdvances: number = this.advanceCost ?? 0;
    const onMisery = this.relief;
    const onHand = this.stabilizationCost;
    const onCard = this.card ? 10 : 0;
    let subtotal = onAdvances + onMisery + onCard;
    if (this.r.stabiliztion) {
      subtotal += onHand;
    }
    const savings = player.$ - subtotal;
    const earnings = this.earnings(player.cities);
    const middleClass = playerHasClass? 10 : 0;
    let interest;
    if (this.r.buyingAdvances.has("L") || player.owns("L")) {
      interest = Math.min(savings, earnings + middleClass);
    } else {
      interest = 0;
    }
    const afterIncome = savings + interest + earnings + middleClass;
    const onTokens = this.r.buyingTokens;
    const nextTurn = afterIncome - onTokens;
    return {
      startedWith: this.r.money,
      onAdvances,
      onCard,
      onHand,
      onMisery,
      subtotal,
      savings,
      interest,
      earnings,
      middleClass,
      afterIncome,
      onTokens,
      nextTurn
    };
  }

  public loadRounds(rounds: Round[]): void {
    this.rounds = rounds;
    let r = rounds.pop();
    if (r instanceof Round) {
      this.r = r;
      this.rounds.push(r);
    }
  }
}
