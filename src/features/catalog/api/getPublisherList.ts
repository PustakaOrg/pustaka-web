import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Publisher } from "~/types/entities/Publisher";
import { PaginatedResponse } from "~/types/responses";

export type GetPublisherListParams = {
  q?: string
} & BaseListParams;

export const getPublisherList = (params?: GetPublisherListParams) => {
	return api.get<PaginatedResponse<Publisher>>("publishers/", {
		params: params as Record<string, string>,
	});
};
