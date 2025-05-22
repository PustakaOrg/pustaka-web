import { api } from "~/shared/utils/api"
import { Loan } from "~/types/entities/Loan"

export const patchLoan = (loanId: string,form: FormData) => {
  return api.patch<Loan>(`loans/${loanId}/`,form)
} 
