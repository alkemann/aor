import { Misery } from './misery';
import { Advance } from './../interfaces/advance';


export class Player {
  private _name: string;
  private _gold: number;
  private purchased: Set<string>;
  public misery: Misery;
  public cathedral: boolean = false;

  constructor(name: string) {
    this._name = name;
    this._gold = 40;
    this.purchased = new Set(["A", "B", "E", "F"]);
    this.misery = new Misery();
  }

  public get name(): string { return this._name; }
  public get $(): number { return this._gold; }

  set spend($: number) {
    this._gold -= $;
  }
  set earn($: number) {
    this._gold += $;
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
