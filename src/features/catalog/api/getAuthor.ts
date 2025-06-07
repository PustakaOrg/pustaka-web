import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export const getAuthor = (id: string) => {
	return api.get<Author>(`authors/${id}/`);
};
