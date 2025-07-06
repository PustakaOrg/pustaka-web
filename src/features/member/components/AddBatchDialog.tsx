import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { FormEvent, use, useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import useAddBatch from "../hooks/useAddBatch";
import { PostBatchPayload } from "../api/postBatch";
import BatchForm from "./BatchForm";

const AddBatchDialog = () => {
	const { newBatch, isPending, isError, error, addBatch } = useAddBatch();
	const [open, setOpen] = useState(false);
	const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const payload: PostBatchPayload = {
			name,
		};
		addBatch(payload);
	}, [addBatch]);

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
					Angkatan
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Angkatan</DialogTitle>
				<BatchForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddBatchDialog;
