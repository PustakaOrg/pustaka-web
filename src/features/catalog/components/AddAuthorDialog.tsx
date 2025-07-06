import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useAddAuthor from "../hooks/useAddAuthor";
import { PostAuthorPayload } from "../api/postAuthor";
import AuthorForm from "./AuthorForm";

const AddAuthorDialog = () => {
	const { newAuthor, isPending, isError, error, addAuthor } = useAddAuthor();
	const [open, setOpen] = useState(false);
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PostAuthorPayload = {
			fullname: name,
		};
		addAuthor(payload);
	}, [addAuthor]);

		useEffect(() => {
		if (!isPending && !isError) {
			setOpen(false);
		}
	}, [isPending, isError]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Author
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Author</DialogTitle>
				<AuthorForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddAuthorDialog;
