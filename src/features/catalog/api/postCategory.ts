import { api } from "~/shared/utils/api";
import { Category } from "~/types/entities/Category";

export type PostCategoryPayload = {
	name: string;
};

export const postCategory = (payload: PostCategoryPayload) => {
	return api.post<Category>("categories/", payload);
};
