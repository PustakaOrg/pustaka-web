export type LibrarianColumnVisibility = {
	librarian: boolean;
	nip: boolean;
	phone_number: boolean;
};

export const defaultColumnVisibility: LibrarianColumnVisibility = {
	librarian: true,
	nip: true,
	phone_number: true,
};
