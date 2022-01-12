import { Bid } from '../interfaces/bid';
import { Nation } from './../enums/nation';


export class Game {

    private _bids: Bid[] = [];

    public get bids() : Bid[]
    {
        return this._bids;
    }

    public addBid(name: string, $: number, nation: Nation): Bid
    {
        const bid = {name, $, nation};
        this._bids.push(bid);
        this._bids.sort((a,b) => a.$ > b.$ ? -1 : 1);
        return bid;
    }

}
