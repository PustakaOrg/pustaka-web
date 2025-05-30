import { Loan } from "./Loan"
import { Payment } from "./Payment"

export type Fine = {
  id: string
  amount: string
  loan: Loan
  payment: Payment
}
