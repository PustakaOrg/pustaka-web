import { Book } from "./Book";
import { Librarian } from "./Librarian";
import { Member } from "./Member";

export type ReservationStatus =
	| "pending"
	| "ready"
	| "canceled"
	| "completed"
	| "expired";

export type Reservation = {
	id: string;
	reservation_date: string;
	pickup_date: string;
	day_to_loan: number;
	reservant: Member;
	book: Book;
	accepted_by: Librarian | null;
	status: ReservationStatus;
};
