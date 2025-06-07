import { api } from "~/shared/utils/api";
import { Author } from "~/types/entities/Author";

export type PatchAuthorPayload = {
	fullname: string;
};
export const patchAuthor = (id: string, payload: PatchAuthorPayload) => {
	return api.patch<Author>(`authors/${id}/`, payload);
};
