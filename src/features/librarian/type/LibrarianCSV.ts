import { Librarian } from "~/types/entities/Librarian";

export const librarianToCSV = (librarians: Librarian[]) =>
	librarians.map((l) => ({
		ID: l.id,
		Nama: l.account.fullname,
		Email: l.account.email,
		NIP: l.nip,
	}));

export type LibrarianCSV = ReturnType<typeof librarianToCSV>
