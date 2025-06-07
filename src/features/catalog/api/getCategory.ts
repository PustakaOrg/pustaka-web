import { api } from "~/shared/utils/api";
import { Category } from "~/types/entities/Category";

export const getCategory = (id: string) => {
	return api.get<Category>(`categories/${id}/`);
};
