import { api } from "~/shared/utils/api";
import { Loan } from "~/types/entities/Loan";

export const postLoan = (form: FormData) => {
	return api.post<Loan>("loans/", form);
};
