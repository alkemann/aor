
const levels = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  125, 150, 175, 200, 250, 300, 350, 400, 450, 500,
  600, 700, 800, 900, 1000, -1
];

export class Misery {

  private m: number = 0;

  private round: number = 0;

  public get level(): number { return levels[this.m]; }

  public incByLevel(l: number = 1): void {
    this.m += l;
  }

  public inc(amount: number): void {
    this.round += amount;
  }

  public dec(amount: number): void {
    this.round -= amount;
  }

  public apply(): number {
    const current_level = this.level;
    const new_value = current_level - this.round;
    for (let i = 0; i < levels.length; i++) {
      if (levels[i] === new_value || (levels[i] < new_value && new_value < levels[i + 1])) {
        this.m = i;
        break;
      }
    }
    this.round = 0;
    return this.level;
  }
}
