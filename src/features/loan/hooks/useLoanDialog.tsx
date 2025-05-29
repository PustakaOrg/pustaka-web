import React, { useCallback, useState } from "react";
import { Loan } from "~/types/entities/Loan";

const useLoanDialog = () => {
	const [loan, setLoan] = useState<Loan | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = useCallback((loan: Loan) => {
		setLoan(loan);
		setIsOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setIsOpen(false);
	}, []);

	return { isOpen, loan, openDialog, closeDialog };
};

export default useLoanDialog;
