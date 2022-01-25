import { Bid } from '../interfaces/bid';
import { Rules } from '../interfaces/rules';
import { Nation } from './../enums/nation';

interface GameState {
  playerCount: number;
  rules: Rules;
  started: boolean;
}

export class Game {


  constructor(
    public readonly playerCount: number,
    private readonly rules: Rules,
    public started: boolean = false,
    ) {
  }

  public startGame(): void {
    this.started = true;
  }

  public addBid(name: string, $: number, nation: Nation): Bid {
    const bid = { name, $, nation };
    // this._bids.push(bid);
    // this._bids.sort((a, b) => a.$ > b.$ ? -1 : 1);
    return bid;
  }

  saveableObject(): GameState {
    return {
      playerCount: this.playerCount,
      rules: this.rules,
      started: this.started,
    };
  }

}
