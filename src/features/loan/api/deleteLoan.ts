import { api } from "~/shared/utils/api"

export const deleteLoan= (loanId: string,) => {
  return api.delete(`books/${loanId}/`)
} 
