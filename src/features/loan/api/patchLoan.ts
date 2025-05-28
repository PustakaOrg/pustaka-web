import { api } from "~/shared/utils/api";
import { Loan, LoanStatus } from "~/types/entities/Loan";

export interface PatchLoanPayload {
	return_proceed_by: string;
	status: LoanStatus;
}

export const patchLoan = (loanId: string, payload: PatchLoanPayload) => {
	return api.patch<Loan>(`loans/${loanId}/`, payload);
};
