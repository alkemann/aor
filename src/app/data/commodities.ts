import { Commodity } from './../interfaces/commodity';
import { Ware } from './../enums/ware';

export const COMMODITIES: Commodity[] = [

  {
    name: Ware.Stone,
    count: 8,
    cards: [2, 0, 0],
    worth: [1,4,9,16,25,36,49,64],
    provinces: ["Naples", "Milan", "Montpelier", "Rome", "Paris", "St. Malo", "Vienna", "Lubeck"],
  },

  {
    name: Ware.Wool,
    count: 9,
    cards: [2, 0, 0],
    worth: [2,8,18,32,50,72,98,128,162,200,242,288],
    provinces: ["Smyrna", "Algiers", "Angora", "Toledo", "London", "Waterford", "York", "Edinburgh", "Basque"],
  },

  {
    name: Ware.Timber,
    count: 7,
    cards: [1, 2, 0],
    worth: [3,12,27,48,75,108,147,192,243,300],
    provinces: ["Fez", "Dubrovnik", "Bordeaux", "Poti", "Bergen", "Riga", "Hamburg"],
  },

  {
    name: Ware.Grain,
    count: 8,
    cards: [0, 2, 0],
    worth: [4,16,36,64,100,144,196,256,324,400,484],
    provinces: ["Seville", "Sicily", "Belgrade", "Kiev", "Dijon", "Portsmouth", "Danzig", "North America"],
  },

  {
    name: Ware.Cloth,
    count: 8,
    cards: [1, 1, 1],
    worth: [5,20,45,80,125,180,245,320,405,500,605],
    provinces: ["Tunis", "Venice", "Florence", "Genoa", "Bruges", "Cologne", "Budapest", "North America"],
  },

  {
    name: Ware.Wine,
    count: 5,
    cards: [1, 1, 1],
    worth: [5,20,45,80,125,180,245,320,405],
    provinces: ["Crete", "Marseilles", "Cyprus", "Barcelona", "Lisbon", "Strasburg"],
  },

  {
    name: Ware.Metal,
    count: 8,
    cards: [1, 1, 1],
    worth: [6,24,54,96,150,216,294,384,486,600],
    provinces: ["Constantinople", "Granada", "Lyon", "Nuremberg", "Chester", "Stockholm", "South America"],
  },

  {
    name: Ware.Fur,
    count: 5,
    cards: [1, 0, 1],
    worth: [7,28,63,112,175,252,343,448],
    provinces: ["Varna", "Tana", "Basel", "Novgorud", "North America"],
  },

  {
    name: Ware.Silk,
    count: 6,
    cards: [1, 1, 1],
    worth: [8,32,72,128,200,288,392,512,648],
    provinces: ["Salonika", "Aleppo", "Erzerum", "Valencia", "East Indies", "China"],
  },

  {
    name: Ware.Spice,
    count: 7,
    cards: [1, 1, 1],
    worth: [9,36,81,144,225,324,441,576,729,900],
    provinces: ["Alexandria", "Acre", "Trebizond", "China", "India", "East Indies", "South America"],
  },

  {
    name: Ware.Gold,
    count: 5,
    cards: [1, 0, 1],
    worth: [10,40,90,160,250,360,490,640],
    provinces: ["Suez", "Sarai", "Prague", "India", "South America"],
  },

  {
    name: Ware.Ivory,
    count: 4,
    cards: [1, 0, 0],
    worth: [10,40,90,160,250,360,490],
    provinces: ["Tripoli", "West Africa", "Cairo", "Iceland"],
  },
];
