import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import BookForm from "./BookForm";
import { FormEvent, useCallback, useEffect, useState } from "react";
import useAddBook from "~/features/catalog/hooks/useAddBook";
import { Plus } from "lucide-react";

const AddBookDialog = () => {
	const { isPending, isError, error, addBook } = useAddBook();
	const [open, setOpen] = useState(false);
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		addBook(form);
		setOpen(false);
	}, []);


	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Book
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
      <DialogTitle>Add New Book</DialogTitle>
				<BookForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default AddBookDialog;
