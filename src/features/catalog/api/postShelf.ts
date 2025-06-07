import { api } from "~/shared/utils/api";
import { Shelf } from "~/types/entities/Shelf";

export type PostShelfPayload = {
	code: string;
};

export const postShelf = (payload: PostShelfPayload) => {
	return api.post<Shelf>("shelves/", payload);
};
