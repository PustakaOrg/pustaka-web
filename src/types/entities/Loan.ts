import { Book } from "./Book";
import { Librarian } from "./Librarian";
import { Member } from "./Member";

type LoanStatus = "active" | "returned" | "overdue" | "lost" | "done"

export type Loan = {
	id: string;
	loan_date: string; 
	return_date: string; 
	borrower: Member;
	book: Book;
	approved_by: Librarian | null;
	return_procced_by: Librarian | null;
	status: LoanStatus;
};


