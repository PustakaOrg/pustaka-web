import { api } from "~/shared/utils/api";
import { Category } from "~/types/entities/Category";

export const allCategory = () => {
	return api.get<Category[]>("categories/all/");
};
