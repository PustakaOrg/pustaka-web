import { api } from "~/shared/utils/api";
import { Loan, LoanStatus } from "~/types/entities/Loan";
import { PaginatedResponse } from "~/types/responses";

export type LoanListParams = Partial<{
	status: string;
}>;
export const getLoans = (params?: LoanListParams) => {
	return api.get<PaginatedResponse<Loan>>("loans/", {
		params: params as unknown as Record<string, string>,
	});
};
