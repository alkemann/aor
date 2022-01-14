
const levels = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
  125, 150, 175, 200, 250, 300, 350, 400, 450, 500,
  600, 700, 800, 900, 1000, -1
];

export class Misery {

  private m: number = 0;

  public get level(): number { return levels[this.m]; }

  public incByLevel(l: number = 1): void {
    this.m += l;
  }

  public levelOf(new_value: number): number {
    for (let i = 0; i < levels.length; i++) {
      if (levels[i] >= new_value) { //  || (levels[i] < new_value && new_value < levels[i + 1])
        return i;
      }
    }
    return 0;
  }

  public changeToSteps(valueChange: number): number {
    const newValue = Math.max(0, this.level + valueChange);
    return this.levelOf(newValue) - this.m;
  }

  public miFromMoreLevels(increases: number): number {
    const step = this.m + increases;
    return levels[step] - this.level;
  }
}
