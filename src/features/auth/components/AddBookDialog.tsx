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

const AddBookDialog = () => {
	const { isPending, isError, error, addBook } = useAddBook();
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
		const form = new FormData(e.currentTarget);
		addBook(form);
	}, []);

  useEffect(()=>{
    console.log("Pending", isPending)
    console.log("isError", isError)
    console.log("error", error)
  } ,[isPending,isError,error])
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button> Test Addbook</Button>
			</DialogTrigger>
			<DialogContent>
				<BookForm handleSubmit={handleSubmit} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default AddBookDialog;
