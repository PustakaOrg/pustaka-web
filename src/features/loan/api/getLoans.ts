import { api } from "~/shared/utils/api"
import { Loan } from "~/types/entities/Loan"
import { PaginatedResponse } from "~/types/responses"

export const getLoans=()=>{
  return api.get<PaginatedResponse<Loan>>("loans/")
}
