import { api } from "~/shared/utils/api";
import { Category } from "~/types/entities/Category";

export const deletCategory = (id: string, ) => {
	return api.delete<Category>(`categories/${id}/`);
};
