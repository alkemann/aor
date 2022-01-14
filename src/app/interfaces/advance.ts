
export interface Advance {
    key: string,
    category: string,
    name: string,
    points: number,
    cost ?: number,
    credit: number,
    researchable: boolean,
    relief: number,
    misery: boolean,
    prerequisites: string[],
    description: string
}
