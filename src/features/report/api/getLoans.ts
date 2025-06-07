import { api } from "~/shared/utils/api";
import { BaseListParams } from "~/types/BaseListParams";
import { Loan, LoanStatus } from "~/types/entities/Loan";
import { PaginatedResponse } from "~/types/responses";
import { PopularLoan } from "../type/PopularLoan";

export type PopularLoanListParams = Partial<{}> & BaseListParams;
export const getPopularLoans = (params?: PopularLoanListParams) => {
	return api.get<PaginatedResponse<PopularLoan>>("loans/popular/", {
		params: params as unknown as Record<string, string>,
	});
};
