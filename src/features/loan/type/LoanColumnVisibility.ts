export interface LoanColumnVisibility {
	borrower: boolean;
	book: boolean;
	loan_date: boolean;
	return_date: boolean;
	approved_by: boolean;
	return_procced_by: boolean;
	status: boolean;
}

export const defaultLoanColumnVisibility: LoanColumnVisibility = {
  borrower: true,
  book: true,
  loan_date: true,
  return_date: true,
  approved_by: true,
  return_procced_by: false,
  status: true
}

