import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Category } from "~/types/entities/Category";
import { PaginatedResponse } from "~/types/responses";

export type GetCategoryListParams = {
  q?: string
} & BaseListParams;

export const getCategoryList = (params?: GetCategoryListParams) => {
	return api.get<PaginatedResponse<Category>>("categories/", {
		params: params as Record<string, string>,
	});
};
