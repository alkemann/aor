import { ADVANCES } from './../data/advances';
import { Injectable } from '@angular/core';
import { Advance } from '../interfaces/advance';

export interface AdvanceList {
  [key: string]: string;
}
export interface CategoryList {
  [key: string]: AdvanceList
}

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private data: Advance[];

  constructor() {
    this.data = ADVANCES;
  }

  public allByCategory(category: string): Advance[] {
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

  public get list(): CategoryList {
    let out: CategoryList = {}
    this.data.forEach(a => out[a.category] = {}); // initiate categories
    this.data.forEach(a => out[a.category][a.key] = a.name);
    return out;
  }

  public get categories(): any[] {
    let out = new Set();
    this.data.forEach(a => out.add(a.category));
    return Array.from(out);
  }

  byKey(key: string): Advance {
    for (const i in this.data) {
      if (Object.prototype.hasOwnProperty.call(this.data, i)) {
        const element = this.data[i];
        if (element && element?.key == key) {
          return element;
        }
      }
    }
    throw new Error("Key [" + key + "] not found!");
  }

}
