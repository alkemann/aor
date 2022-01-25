import { Storable } from "../interfaces/storable";

export class Round implements Storable {

  public stabiliztion: boolean = true;
  public card: boolean = false;
  public buyingAdvances: Set<string> ;

  public earnedCash: number = 0;
  public boughtTokens: number = 0;
  public boughtRelief: number = 0;

  public endCash: number = 0;

  constructor(
    public readonly i: number,
    public readonly money: number, // start cash aka "total"
    public readonly tokens: number, // aka bought to use to explore this round
    public hand: number = 0,
    buyingAdvances: string[] = []
    ) {
    this.buyingAdvances = new Set<string>(buyingAdvances)
  }

  public buyAdvanceToggle(adv: string): void {
    if (this.buyingAdvances.has(adv)) {
      this.buyingAdvances.delete(adv);
    } else {
      this.buyingAdvances.add(adv);
    }
  }

  public get relief(): number { return this.boughtRelief; }
  public buyRelief(n: number) {
    this.boughtRelief += n;
    this.boughtRelief = Math.max(0, this.boughtRelief);
  }

  public get buyingTokens(): number { return this.boughtTokens };
  public buyTokens(n: number): void {
    const want = this.boughtTokens + n;
    this.boughtTokens = Math.min(36, Math.max(0, want));
  }

  public buyCheck(adv: string): boolean {
    return this.buyingAdvances.has(adv);
  }

  public makeStateObject(): RoundState {
    return {
      i: this.i,
      money: this.money,
      tokens: this.tokens,
      stabiliztion: this.stabiliztion,
      card: this.card,
      hand: this.hand,
      advances: Array.from(this.buyingAdvances),
      earnedCash: this.earnedCash,
      boughtTokens: this.boughtTokens,
      boughtRelief: this.boughtRelief,
      endCash: this.endCash
    };
  }
}

export interface RoundState {
  i: number;
  money: number;
  tokens: number;
  stabiliztion: boolean;
  card: boolean;
  hand: number;
  advances: string[];
  earnedCash: number;
  boughtTokens: number;
  boughtRelief: number;
  endCash: number;
}

export function roundFromStateObject(state: RoundState): Round {
  const r = new Round(
    state.i,
    state.money,
    state.tokens,
    state.hand,
    state.advances
  );
  r.stabiliztion = state.stabiliztion;
  r.card = state.card;
  r.earnedCash = state.earnedCash;
  r.boughtTokens = state.boughtTokens;
  r.boughtRelief = state.boughtRelief;
  r.endCash = state.endCash;
  return r;
}