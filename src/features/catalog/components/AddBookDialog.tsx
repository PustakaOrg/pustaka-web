import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import BookForm from "./BookForm";
import { FormEvent, useCallback, useEffect } from "react";
import useAddBook from "~/features/catalog/hooks/useAddBook";
import { Book } from "~/types/entities/Book";
import { Plus } from "lucide-react";

const AddBookDialog = () => {
	const { isPending, isError, error, addBook } = useAddBook();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		addBook(form);
	}, []);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus />
					Addbook
				</Button>
			</DialogTrigger>
			<DialogContent className="md:min-w-2xl max-h-[98vh] overflow-y-auto">
				<BookForm handleSubmit={handleSubmit} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default AddBookDialog;
