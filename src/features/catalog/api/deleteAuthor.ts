import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export const deleteAuthor = (id: string, ) => {
	return api.delete<Author>(`authors/${id}/`);
};
