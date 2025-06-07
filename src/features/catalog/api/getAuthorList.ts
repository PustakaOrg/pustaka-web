import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Author } from "~/types/entities/Author";
import { PaginatedResponse } from "~/types/responses";

export type GetAuthorListParams = {
  q?: string
} & BaseListParams;

export const getAuthorList = (params?: GetAuthorListParams) => {
	return api.get<PaginatedResponse<Author>>("authors/", {
		params: params as Record<string, string>,
	});
};
