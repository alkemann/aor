import { Advance } from './../interfaces/advance';

export const ADVANCES: Advance[] = [
    {
        key: "A", name: "The Heavens",
        category: "science",
        points: 30,
        credit: 20,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "Allows transit of one sea as a Costal Province."
    },

    {
        key: "B", name: "Human body",
        category: "science",
        points: 60,
        credit: 20,
        researchable: true,
        relief: 10,
        misery: false,
        prerequisites: [],
        description: "Reduses Misery one space. Lessens Mystism Mistery."
    },

    {
        key: "C", name: "Laws of Matter",
        category: "science",
        points: 90,
        credit: 20,
        researchable: true,
        relief: 10,
        misery: false,
        prerequisites: [],
        description: "Voids Alchemy and lessens Mystism Mistery."
    },

    {
        key: "D", name: "Enlightenment",
        category: "science",
        points: 120,
        credit: 20,
        researchable: true,
        relief: 50,
        misery: false,
        prerequisites: [],
        description: "Halves Misery Relief price and lessens Mystism Mistery."
    },


    {
        key: "E", name: "Patronage",
        category: "religion",
        points: 30,
        credit: 20,
        researchable: false,
        relief: 5,
        misery: true,
        prerequisites: [],
        description: "Allows investment in Leadesr played by other players."
    },

    {
        key: "F", name: "Holy Indulgence",
        category: "religion",
        points: 60,
        credit: 20,
        researchable: false,
        relief: 5,
        misery: true,
        prerequisites: [],
        description: "Collect two Expansion tokens per turn from each non-owner."
    },

    {
        key: "G", name: "Proselytism",
        category: "religion",
        points: 90,
        credit: 20,
        researchable: false,
        relief: 5,
        misery: true,
        prerequisites: [],
        description: "Win attacks also if red die matches Order of play."
    },

    {
        key: "H", name: "Cathedral",
        category: "religion",
        points: 120,
        credit: 20,
        researchable: false,
        relief: 5,
        misery: true,
        prerequisites: ["F"],
        description: "Automatically wins one attack per turn vs each non-owner."
    },


    {
        key: "I", name: "Caravan",
        category: "commerce",
        points: 20,
        credit: 10,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "Place tokens through adjancent uncontrolled province."
    },

    {
        key: "J", name: "Wind/Watermill",
        category: "commerce",
        points: 40,
        credit: 10,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: ["I"],
        description: "Buy one trade attempt with defeated Market. dr <= Market #"
    },

    {
        key: "K", name: "Improved Agriculture",
        category: "commerce",
        points: 50,
        credit: 10,
        researchable: true,
        relief: 25,
        misery: false,
        prerequisites: ["I","J"],
        description: "Reduces Misery one space. Reduces effect of Famine."
    },

    {
        key: "L", name: "Interest & Profit",
        category: "commerce",
        points: 80,
        credit: 10,
        researchable: true,
        relief: 0,
        misery: false,
        prerequisites: ["I", "J", "K"],
        description: "Doubles cash after Expansion, up to value of income."
    },

    {
        key: "M", name: "Industry",
        category: "commerce",
        points: 110,
        credit: 0,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: ["I", "J", "K", "L"],
        description: "Increases commody value by one payment box."
    },


    {
        key: "N", name: "Written Record",
        category: "communications",
        points: 30,
        credit: 10,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "Increases Leader credits by $10 (including Patronage claims"
    },

    {
        key: "O", name: "Printed Word",
        category: "communications",
        points: 60,
        credit: 10,
        researchable: true,
        relief: 10,
        misery: false,
        prerequisites: ["N"],
        description: "Earns Leader Discount Rebate for any owned Advance."
    },

    {
        key: "P", name: "Master Art",
        category: "communications",
        points: 90,
        credit: 10,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: ["N", "O"],
        description: "May discard one card per turn without effect during Buy phase"
    },

    {
        key: "Q", name: "Renaissance",
        category: "communications",
        points: 120,
        credit: 0,
        researchable: true,
        relief: 100,
        misery: false,
        prerequisites: ["N", "O", "P"],
        description: "Once/turn trades Order of Play with adjacent non-owner."
    },


    {
        key: "R", name: "Overland east",
        category: "exploration",
        points: 40,
        credit: 20,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "Allows transit of Area V"
    },

    {
        key: "S", name: "Seaworthy vessels",
        category: "exploration",
        points: 80,
        credit: 20,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "May eter all Coalstal Provices except Far East and New World"
    },

    {
        key: "T", name: "Ocean navigation",
        category: "exploration",
        points: 120,
        credit: 20,
        researchable: true,
        relief: 5,
        misery: false,
        prerequisites: ["A", "S"],
        description: "Allows transit of Far East"
    },

    {
        key: "U", name: "New world",
        category: "exploration",
        points: 160,
        credit: 20,
        researchable: true,
        relief: 25,
        misery: false,
        prerequisites: ["V", "T"],
        description: "May enter New World. Reduces Misery one space during Income Phase"
    },


    {
        key: "V", name: "Urban Ascendancy",
        category: "civics",
        points: 20,
        credit: 10,
        researchable: false,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "May buy one extra card for $10 each turn."
    },

    {
        key: "W", name: "Nationalism",
        category: "civics",
        points: 60,
        credit: 20,
        researchable: false,
        relief: 5,
        misery: false,
        prerequisites: [],
        description: "Adds 1 to all attack totals in Home Area."
    },

    {
        key: "X", name: "Institutional Research",
        category: "civics",
        points: 100,
        credit: 30,
        researchable: false,
        relief: 10,
        misery: false,
        prerequisites: [],
        description: "Provides 10 Credit for any Advance except Civics & Religion."
    },

    {
        key: "Y", name: "Cosmopolitan",
        category: "civics",
        points: 150,
        credit: 40,
        researchable: false,
        relief: 25,
        misery: false,
        prerequisites: ["R"],
        description: "Controlled Satellites add to adjacent provice attacks."
    },

    {
        key: "Z", name: "Middle Class",
        category: "civics",
        points: 170,
        credit: 50,
        researchable: false,
        relief: 50,
        misery: false,
        prerequisites: ["K"],
        description: "Increases Income by $10/turn. Halves stabilization costs."
    }
];
