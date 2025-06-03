import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Batch } from "~/types/entities/Batch";
import { PaginatedResponse } from "~/types/responses";

export type GetBatchListParams = {} & BaseListParams;

export const getBatchList = (params?: GetBatchListParams) => {
	return api.get<PaginatedResponse<Batch>>("batches/", {
		params: params as Record<string, string>,
	});
};
