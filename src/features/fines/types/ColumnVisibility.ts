export interface FineColumnVisibility {
	book: boolean;
	borrower: boolean;
	loan_status: boolean;
	amount: boolean;
	payment_status: boolean;
}

export const defaultFineColumnVisibility: FineColumnVisibility = {
	book: true,
	borrower: true,
	loan_status: true,
	amount: true,
	payment_status: true,
};
