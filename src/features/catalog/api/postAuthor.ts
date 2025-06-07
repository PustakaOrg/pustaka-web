import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export type PostAuthorPayload = {
	fullname: string;
};

export const postAuthor = (payload: PostAuthorPayload) => {
	return api.post<Author>("authors/", payload);
};
