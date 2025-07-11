import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import BookForm from "./BookForm";
import { FormEvent, useCallback, useEffect } from "react";
import { Book } from "~/types/entities/Book";
import useUpdateBook from "../hooks/useUpdateBook";

interface UpdateBookDialogProps {
	book: Book;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateBookDialog = ({
	book,
	isOpen,
	onOpenChange,
}: UpdateBookDialogProps) => {
	const { isPending, isError, error, updateBook } = useUpdateBook();
	
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const isbn = form.get("isbn") as string;
		
		if (isbn === book.isbn) {
			form.delete("isbn");
		}
		
		updateBook({ bookId: book.id, data: form });
	}, [book.isbn, book.id, updateBook]); 


	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Buku</DialogTitle>
				<BookForm handleSubmit={handleSubmit} defaultValues={book} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default UpdateBookDialog;
