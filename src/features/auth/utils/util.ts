import { Admin } from "~/types/entities/Admin";
import { Librarian } from "~/types/entities/Librarian";
import { Member } from "~/types/entities/Member";

export const isAdminObject = (obj: unknown): obj is Admin => {
	if (typeof obj === "object" && obj !== null && "group" in obj) {
		return true;
	}

	return false;
};

export const isMemberObject = (obj: unknown): obj is Member => {
	if (typeof obj === "object" && obj !== null && "nis" in obj) {
		return true;
	}

	return false;
};

export const isLibrarianObject = (obj: unknown): obj is Librarian => {
	if (typeof obj === "object" && obj !== null && "nip" in obj) {
		return true;
	}

	return false;
};
