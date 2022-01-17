import { Misery } from './misery';
import { Nation } from '../enums/nation';


export class Player {
  private _name: string;
  private _gold: number;
  private purchased: Set<string>;
  public misery: Misery;
  public cathedral: boolean = false;
  public cities: number = 1;

  public bid: number = 0;
  public nation: Nation;

  constructor(name: string) {
    this._name = name;
    this._gold = 40;
    this.purchased = new Set([]);
    this.misery = new Misery();
  }

  public get name(): string { return this._name; }
  public get $(): number { return this._gold; }

  set $($: number) {
    if ($ < 0) throw new Error("Money must be positive!");
    this._gold = $;
  }

  public set earn($: number) {
    this._gold += $;
    this._gold = Math.max(0, this._gold);
  }

  public set spend($: number) {
    this._gold -= $;
    this._gold = Math.max(0, this._gold);
  }

  public payForBid($:number) {
    this.bid = $;
    this.spend = $;
  }

  public get maxMRsteps(): number {
    return 1;
  }

  public owns(letter: string): boolean {
    return this.purchased.has(letter);
  }

  public add(adv: string): void {
    this.purchased.add(adv);
  }

  public toggle(adv: string): void {
    if (this.purchased.has(adv)) {
      this.purchased.delete(adv);
    } else {
      this.purchased.add(adv);
    }
  }

}
