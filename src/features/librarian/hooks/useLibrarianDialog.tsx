import { useCallback, useState } from "react";
import { Librarian } from "~/types/entities/Librarian";

const useLibrarianDialog = () => {
	const [librarian, setLibrarian] = useState<Librarian | null>(null);
	const [isOpen, setIsOpen] = useState(false);

	const openDialog = useCallback((librarian: Librarian) => {
		setLibrarian(librarian);
		setIsOpen(true);
	}, []);

	const closeDialog = useCallback(() => {
		setIsOpen(false);
	}, []);

	return { isOpen, librarian, openDialog, closeDialog };
};

export default useLibrarianDialog;
