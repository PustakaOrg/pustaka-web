import { Book } from "./Book";
import { Librarian } from "./Librarian";
import { Member } from "./Member";

export type Reservation = {
    id: string;
    reservation_date: string; // ISO 8601 date string
    pickup_date: string; // ISO 8601 date string
    reservant: Member;
    book: Book;
    accepted_by: Librarian | null; // Assuming it can be null
    status: string; // e.g., "pending", "accepted", etc.
}
