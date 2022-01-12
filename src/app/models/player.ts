import { Advance } from './../interfaces/advance';


export class Player {
    private _name: string;
    private _gold: number;
    private purchased: string[];

    constructor(name: string) {
        this._name = name;
        this._gold = 40;
        this.purchased = ["A", "B", "E", "F"];
    }

    public get name(): string { return this._name; }
    public get $(): number { return this._gold; }

    public owns(letter: string): boolean {
        return this.purchased.includes(letter);
    }

    public buy(adv: Advance): void {
        this._gold -= adv.cost; // @TODO apply credits
        this.purchased.push(adv.key);
        this.purchased.sort();
    }

    public get advances(): string[] {
        return this.purchased;
    }

}
