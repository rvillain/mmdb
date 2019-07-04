import { WordData } from "./wordData";

export interface WordRate {
	id?: number,
    wordDataId: number,
    wordData?: WordData,
	rate: number
}
