import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback } from "react";
import { Author } from "~/types/entities/Author";
import useUpdateAuthor from "../hooks/useUpdateAuthor";
import { PatchAuthorPayload } from "../api/patchAuthor";
import AuthorForm from "./AuthorForm";


interface UpdateAuthorDialogProps {
	author: Author;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateAuthorDialog = ({
	author,
	isOpen,
	onOpenChange,
}: UpdateAuthorDialogProps) => {
	const { updateAuthor, isPending , isError, error } = useUpdateAuthor();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PatchAuthorPayload = {
			fullname: name,
		};
		updateAuthor({ id: author.id, payload });
		onOpenChange(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Author</DialogTitle>
        <AuthorForm handleSubmit={handleSubmit} error={error} defaultValues={author} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateAuthorDialog;
