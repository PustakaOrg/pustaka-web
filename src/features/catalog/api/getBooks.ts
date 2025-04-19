import { api } from "~/shared/utils/api";
import { Book } from "~/types/entities/Book";
import { PaginatedResponse } from "~/types/responses";
import { BookListParams } from "../types/BookListParams";

export const getBooks = (params?: BookListParams) => {
	return api.get<PaginatedResponse<Book>>("api/books/", { params });
};
