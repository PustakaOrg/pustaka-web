import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Fine } from "~/types/entities/Fine";
import { PaymentStatus } from "~/types/entities/Payment";
import { PaginatedResponse } from "~/types/responses";

export type FinesListParams = Partial<{
	status: PaymentStatus;
}> & BaseListParams;

export const getFines = (params?: FinesListParams) => {
	return api.get<PaginatedResponse<Fine>>("fines/", {
		params: params as Record<string, string>,
	});
};
