import { Librarian } from "./Librarian";

export type PaymentStatus = "pending" | "done";

export type Payment = {
	id: string;
	accepted_by: Librarian | null;
	status: PaymentStatus;
};
