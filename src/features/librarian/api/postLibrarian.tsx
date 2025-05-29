import { api } from "~/shared/utils/api";
import { Librarian } from "~/types/entities/Librarian";

export type PostLibrarianPayload = {
	account: {
		email: string;
		password: string;
		fullname: string;
	};
	nip: string;
	phone_number: string;
};

export const postLibrarian = (payload: PostLibrarianPayload) => {
	return api.post<Librarian>("librarians/", payload);
};
