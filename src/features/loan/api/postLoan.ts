import { api } from "~/shared/utils/api";
import { Loan } from "~/types/entities/Loan";

export interface PostLoanPayload {
	loan_date: string;
	return_date: string;
	borrower: string;
	book: string;
	approved_by: string;
}

export const postLoan = (payload: PostLoanPayload) => {
	return api.post<Loan>("loans/", payload);
};
