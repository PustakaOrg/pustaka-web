export type Book = {
	id: string;
	title: string;
	isbn: string;
	img: string;
	pages: number;
	publish_year: number;
	stock: number;
	available_stock: number;
	shelf: string | null;
	category: string[];
	author: string | null;
	publisher: string | null;
};
