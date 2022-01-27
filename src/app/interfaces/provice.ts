import { Ware } from "./../enums/ware";

export interface Province {
  name: string;
  capital?: boolean;
  market: number;
  area?: number;
  resources?: Ware[]
}
