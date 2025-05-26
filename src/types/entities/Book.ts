import { Author } from "./Author";
import { Category } from "./Category";
import { Publisher } from "./Publisher";
import { Shelf } from "./Shelf";

export type Book = {
	id: string;
	title: string;
	isbn: string;
	img: string;
	pages: number;
	publish_year: number;
	stock: number;
	available_stock: number;
	shelf: Shelf | null;
	category: Category[] | [];
	author: Author | null;
	publisher: Publisher | null;
};
