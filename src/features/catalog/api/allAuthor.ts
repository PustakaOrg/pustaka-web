import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export const allAuthor = () => {
	return api.get<Author[]>("authors/all/");
};
