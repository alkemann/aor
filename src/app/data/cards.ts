
interface Credit {
  name: string;
  amount: number;
}

export enum CardType {
  Commodity,
  Event,
  Leader,
}

export interface Card {
  name: string;
  type: CardType;
  epoch: number;
  gold?: number;
  misery?: number;
  credit?: Credit[];
  description?: string;
}

export const CARDS: Card[] = [
  { name: "Alchemist's Gold", epoch: 1, type: CardType.Event },
  { name: "Armor", epoch: 1, type: CardType.Event },
  { name: "Black Death", epoch: 2, type: CardType.Event },
  { name: "Civil War", epoch: 1, type: CardType.Event },
  { name: "Enlightened Ruler", epoch: 1, type: CardType.Event },
  { name: "Famine", epoch: 1, type: CardType.Event },
  { name: "Gunpowder", epoch: 2, type: CardType.Event },
  { name: "Long Bow", epoch: 2, type: CardType.Event },
  { name: "Mongol Armies", epoch: 2, type: CardType.Event },
  { name: "Mysticism Abounds 1 Papal Decree", epoch: 1, type: CardType.Event },
  { name: "Pirates / Vikings", epoch: 1, type: CardType.Event },
  { name: "Rebellion", epoch: 1, type: CardType.Event },
  { name: "Religious Strife", epoch: 2, type: CardType.Event },
  { name: "Revolutionary Uprisings 1 Stirrups", epoch: 1, type: CardType.Event },
  { name: "The Crusades", epoch: 1, type: CardType.Event },
  { name: "War", epoch: 1, type: CardType.Event },

  {
    name: "Andreas V esalius", epoch: 3, type: CardType.Leader,
    credit: []
  },
  {
    name: "Bartalome de Las Casas", epoch: 3, type: CardType.Leader,
    credit: []
  },
  {
    name: "Charlemagne", epoch: 1, type: CardType.Leader,
    credit: []
  },
  {
    name: "Christopher Columbus", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Desiderius Erasmus 1 Dionysus Exiguus 3 Galileo Galilei", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Henry Oldenburg", epoch: 3, type: CardType.Leader,
    credit: []
  },
  {
    name: "Ibn Majid", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Johann Gutenberg", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Leonardo Da Vinci", epoch: 3, type: CardType.Leader,
    credit: []
  },
  {
    name: "Marco Polo", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Nicolas Copernicus 2 Prince Henry", epoch: 2, type: CardType.Leader,
    credit: []
  },
  {
    name: "Rashid ad Din", epoch: 1, type: CardType.Leader,
    credit: []
  },
  {
    name: "Sir Isaac Newton", epoch: 3, type: CardType.Leader,
    credit: []
  },
  {
    name: "St. Benedict", epoch: 1, type: CardType.Leader,
    credit: []
  },
  {
    name: "Walter the Penniless", epoch: 1, type: CardType.Leader,
    credit: []
  },
  {
    name: "William Caxton", epoch: 2, type: CardType.Leader,
    credit: []
  },

]
