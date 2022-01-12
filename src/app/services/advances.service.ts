import { Injectable } from '@angular/core';
import { Advance } from '../interfaces/advance';
import jsondata from '../data/advances.json';


interface AdvanceList {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private data: Advance[];

  constructor()
  {
    this.data = jsondata;
  }

  public allByCategory(category: string): Advance[]
  {
    let out = [];
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const element = this.data[key];
        if (element && element?.category == category) {
          out.push(element);
        }
      }
    }
    return out;
  }

  public get list(): AdvanceList {
    let out:AdvanceList = {};
    this.data.forEach(a => out[a.key] = a.name);
    return out;
  }

  byKey(key: string): Advance {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const element = this.data[key];
        if (element && element?.key == key) {
          return element;
        }
      }
    }
    throw new Error("Key [" + key + "] not found!");
  }

}
