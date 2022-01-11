
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
