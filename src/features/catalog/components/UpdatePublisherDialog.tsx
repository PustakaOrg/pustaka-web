import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import { FormEvent, useCallback } from "react";
import { Publisher } from "~/types/entities/Publisher";
import useUpdatePublisher from "../hooks/useUpdatePublisher";
import { PatchPublisherPayload } from "../api/patchPublisher";
import PublisherForm from "./PublisherForm";

interface UpdatePublisherDialogProps {
	publisher: Publisher;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdatePublisherDialog = ({
	publisher,
	isOpen,
	onOpenChange,
}: UpdatePublisherDialogProps) => {
	const { updatePublisher, isPending, isError, error } = useUpdatePublisher();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const name = String(form.get("name"));
		const city = String(form.get("city"));
		const payload: PatchPublisherPayload = {
			name,
			city,
		};
		updatePublisher({ id: publisher.id, payload });
		
	};

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Penerbit</DialogTitle>
				<PublisherForm
					handleSubmit={handleSubmit}
					error={error}
					defaultValues={publisher}
				/>
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdatePublisherDialog;
