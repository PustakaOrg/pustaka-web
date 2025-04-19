import { api } from "~/shared/utils/api";
import { Book } from "~/types/entities/Book";
import { PaginatedResponse } from "~/types/responses";

type GetBooksParams = {
	q: string;
	author: string;
	category: string;
	publisher: string;
	publish_year: string;
	available: string;

};

export const getBooks = (params: GetBooksParams) => {
	return api.get<PaginatedResponse<Book>>("api/books/", { params });
};
