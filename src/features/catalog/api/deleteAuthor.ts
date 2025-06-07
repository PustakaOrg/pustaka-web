import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export const deletAuthor = (id: string, ) => {
	return api.delete<Author>(`authors/${id}/`);
};
