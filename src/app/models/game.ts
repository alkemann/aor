import { Bid } from '../interfaces/bid';
import { Rules } from '../interfaces/rules';
import { Storable } from '../interfaces/storable';
import { Nation } from './../enums/nation';

interface GameState {
  playerCount: number;
  rules: Rules;
  started: boolean;
}

export class Game implements Storable {

  constructor(
    public readonly playerCount: number,
    private readonly rules: Rules,
    public started: boolean = false,
    ) {
  }

  public startGame(): void {
    this.started = true;
  }

  makeStateObject(): GameState {
    return {
      playerCount: this.playerCount,
      rules: this.rules,
      started: this.started,
    };
  }

}

export function gameFromStateObject(state: GameState): Game {
  return new Game(state.playerCount, state.rules, state.started);
}