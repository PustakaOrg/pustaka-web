import { api } from "~/shared/utils/api";
import { Librarian } from "~/types/entities/Librarian";

export type PatchLibrarianPayload = {
	account: {
		email?: string;
		password?: string;
		fullname?: string;
	};
	nip?: string;
	phone_number?: string;
};

export const patchLibrarian = (id: string,payload: PatchLibrarianPayload) => {
	return api.patch<Librarian>(`librarians/${id}/`, payload);
};
