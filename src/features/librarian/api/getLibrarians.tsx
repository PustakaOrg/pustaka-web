import { api } from "~/shared/utils/api";
import { Librarian } from "~/types/entities/Librarian";
import { PaginatedResponse } from "~/types/responses";

export type LibrarianListParams = Partial<{
	limit: number;
	offset: number;
  q: string
}>;

export const getLibrarian = (params?: LibrarianListParams) => {
	return api.get<PaginatedResponse<Librarian>>("librarians/", {
		params: params as Record<string,string>,
	});
};
