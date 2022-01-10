import { Injectable } from '@angular/core';
import jsondata from './data/advances.json';

export interface Advance {

  key: string,
  category: string,
  name: string,
  cost: number,
  credit: number,
  researchable: boolean,
  relief: number,
  misery: boolean,
  prerequisites: string[],
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private data: Advance[];

  constructor() {
    this.data = jsondata;
   }
  
  public allByCategory(category: string): Advance[] {
    let out = [];
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const element = this.data[key];
        if (element && element?.category == category ) {
          out.push(element);
        }
      }
    }
    return out;
  }

  byKey(key: string): Advance {
    for (const key in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, key)) {
        const element = this.data[key];
        if (element && element?.key == key ) {
          return element;
        }
      }
    }
    throw new Error("Key [" + key + "] not found!");
  }

}
