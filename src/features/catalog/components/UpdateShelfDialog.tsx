import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback } from "react";
import { Shelf } from "~/types/entities/Shelf";
import useUpdateShelf from "../hooks/useUpdateShelf";
import { PatchShelfPayload } from "../api/patchShelf";
import ShelfForm from "./ShelfForm";


interface UpdateShelfDialogProps {
	shelf: Shelf;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateShelfDialog = ({
	shelf,
	isOpen,
	onOpenChange,
}: UpdateShelfDialogProps) => {
	const { updateShelf, isPending , isError, error } = useUpdateShelf();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const code = String(form.get("code"));
		const payload: PatchShelfPayload = {
			 code,
		};
		updateShelf({ id: shelf.id, payload });
		onOpenChange(false);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Rak</DialogTitle>
        <ShelfForm handleSubmit={handleSubmit} error={error} defaultValues={shelf} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateShelfDialog;
