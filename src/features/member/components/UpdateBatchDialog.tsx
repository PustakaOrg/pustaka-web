import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback } from "react";
import { Batch } from "~/types/entities/Batch";
import useUpdateBatch from "../hooks/useUpdateBatch";
import { PatchBatchPayload } from "../api/patchBatch";
import BatchForm from "./BatchForm";


interface UpdateBatchDialogProps {
	batch: Batch;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateBatchDialog = ({
	batch,
	isOpen,
	onOpenChange,
}: UpdateBatchDialogProps) => {
	const { updateBatch, isPending , isError, error } = useUpdateBatch();
	const handleSubmit =(e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PatchBatchPayload = {
			name,
		};
		updateBatch({ id: batch.id, payload });
	}

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Angkatan</DialogTitle>
        <BatchForm handleSubmit={handleSubmit} error={error} defaultValues={batch} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateBatchDialog;
