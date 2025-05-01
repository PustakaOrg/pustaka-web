import { Book } from "./Book";
import { Librarian } from "./Librarian";
import { Member } from "./Member";

export type Loan = {
	id: string;
	loan_date: string; // ISO 8601 date string
	return_date: string; // ISO 8601 date string
	borrower: Member;
	book: Book;
	approved_by: Librarian | null;
	return_procced_by: Librarian | null;
	status: string;
};
