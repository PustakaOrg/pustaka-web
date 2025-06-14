
import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback, useState } from "react";
import { Plus } from "lucide-react";
import useAddShelf from "../hooks/useAddShelf";
import { PostShelfPayload } from "../api/postShelf";
import ShelfForm from "./ShelfForm";

const AddShelfDialog = () => {
	const { newShelf, isPending, isError, error, addShelf } = useAddShelf();
	const [open, setOpen] = useState(false);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const code = String(form.get("code"));
		const payload: PostShelfPayload = {
			code,
		};
		addShelf(payload);
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Shelf
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Shelf</DialogTitle>
				<ShelfForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddShelfDialog;
