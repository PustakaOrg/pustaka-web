import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Shelf } from "~/types/entities/Shelf";
import { PaginatedResponse } from "~/types/responses";

export type GetShelfListParams = {
  q?: string
} & BaseListParams;

export const getShelfList = (params?: GetShelfListParams) => {
	return api.get<PaginatedResponse<Shelf>>("shelves/", {
		params: params as Record<string, string>,
	});
};
