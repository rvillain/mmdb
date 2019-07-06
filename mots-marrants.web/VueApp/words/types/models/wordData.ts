export interface WordData {
	id?: number;
	word: string
	definition?: string
	link?: string
	author?: string
	creationDate?: Date
	examples?: string
	wordType?: string
	validated?: boolean
	validationDate?: Date
	rate?: number;
	rateCount?: number;
	tags?: string;
}
