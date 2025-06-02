import { api } from "~/shared/utils/api"
import { Category } from "~/types/entities/Category"
import { PaginatedResponse } from "~/types/responses"

export type CategoryListParams = Partial<{
	limit: number;
	offset: number;
}>;

export const getCategory = (params?: CategoryListParams) => {
  return api.get<PaginatedResponse<Category>>("categories/", {
		params: params as Record<string,string>,
	});
};