import { api } from "~/shared/utils/api";
import { Fine } from "~/types/entities/Fine";
import { PaginatedResponse } from "~/types/responses";

export type FinesListParams = Partial<{
	limit: number;
	offset: number;
}>;

export const getFines = (params?: FinesListParams) => {
	return api.get<PaginatedResponse<Fine>>("fines/", {
		params: params as Record<string, string>,
	});
};
