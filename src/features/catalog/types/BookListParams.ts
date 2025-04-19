export type BookListParams = Partial<{
	q: string;
	author: string;
	category: string[];
	publisher: string;
	publish_year: string;
	available: string;
}>;
