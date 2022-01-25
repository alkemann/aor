import { Misery } from './misery';
import { Nation } from '../enums/nation';
import { Storable } from '../interfaces/storable';

interface PlayerInterface {
  readonly name: string;
  bid: number;
  nation: Nation;
  purchased: Set<string>;
  payForBid: ($:number) => void;
  owns: (adv: string) => boolean;
  add: (adv: string) => void;
  toggle: (adv: string) => void;
}

export class Player implements PlayerInterface, Storable {
  bid: number = 0;
  purchased: Set<string> = new Set<string>();
  nation: Nation;

  constructor(private _name: string) {}
  public get name() { return this._name; }
  public payForBid ($:number) {
    this.bid = $;
  }

  public owns(adv: string): boolean {
    return this.purchased.has(adv);
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

  makeStateObject(): any {
    const obj = {
      name: this.name,
      owns: Array.from(this.purchased),
      bid: this.bid,
      nation: this.nation
    };
    return obj;
  }
}

export class User extends Player {

  public misery: Misery = new Misery();
  public cities: number = 1;

  private _gold: number = 40;

  public get $(): number { return this._gold; }
  public set $($: number) {
    if ($ < 0) throw new Error("Money must be positive!");
    this._gold = $;
  }
  public override payForBid($:number) {
    this.bid = $;
    this._gold -= $;
  }

  public earn($: number) {
    this._gold += $;
    this._gold = Math.max(0, this._gold);
  }

  public spend($: number) {
    this._gold -= $;
    this._gold = Math.max(0, this._gold);
  }

  override makeStateObject(): UserState {
    const obj = super.makeStateObject();
    obj.misery = this.misery.level;
    obj.cities = this.cities;
    obj.gold = this.$;
    return obj;
  }
}

export interface PlayerState {
  name: string,
  owns: string[],
  bid: number,
  nation: Nation
}

export interface UserState extends PlayerState {
  misery: number;
  cities: number;
  gold: number;
}

export function playerFromStateObject(state: PlayerState): Player {
  const other = new Player(state.name);
  other.bid = state.bid;
  other.purchased = new Set(state.owns);
  other.nation = state.nation;
  return other;
}

export function userFromStateObject(state: UserState): User {
  const user = new User(state.name);
  user.bid = state.bid;
  user.purchased = new Set(state.owns);
  user.nation = state.nation;
  user.misery = new Misery(state.misery);
  user.cities = state.cities;
  user.$ = state.gold;
  return user;
}
