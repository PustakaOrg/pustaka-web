import { api } from "~/shared/utils/api";
import { Category } from "~/types/entities/Category";

export type PatchCategoryPayload = {
	name: string;
};
export const patchCategory = (id: string, payload: PatchCategoryPayload) => {
	return api.patch<Category>(`categories/${id}/`, payload);
};
