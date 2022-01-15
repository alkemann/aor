import { Bid } from '../interfaces/bid';
import { Rules } from '../interfaces/rules';
import { Nation } from './../enums/nation';


export class Game {

  public playerCount: number;
  private _rules: Rules;
  public started: boolean = false;

  constructor(pc: number, rules: Rules) {
    this.playerCount = pc;
    this._rules = rules;
  }

  public get rules(): Rules { return this._rules; }


  public addBid(name: string, $: number, nation: Nation): Bid {
    const bid = { name, $, nation };
    // this._bids.push(bid);
    // this._bids.sort((a, b) => a.$ > b.$ ? -1 : 1);
    return bid;
  }

}
