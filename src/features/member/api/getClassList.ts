import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Class } from "~/types/entities/Class";
import { PaginatedResponse } from "~/types/responses";

export type GetClassListParams = {
  q?: string
} & BaseListParams;

export const getClassList = (params?: GetClassListParams) => {
	return api.get<PaginatedResponse<Class>>("classes/", {
		params: params as Record<string, string>,
	});
};
