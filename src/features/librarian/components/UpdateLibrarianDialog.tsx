import { Librarian } from "~/types/entities/Librarian";

import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from "~/shared/components/ui/dialog";
import LibrarianForm, { LibrarianFormData } from "./LibrarianForm";
import useUpdateLibrarian from "../hooks/useUpdateLibrarian";
import { PatchLibrarianPayload } from "../api/patchLibrarian";

interface UpdateBookDialogProps {
	librarian: Librarian;
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
}

const UpdateLibrarianDialog = ({
	librarian,
	isOpen,
	onOpenChange,
}: UpdateBookDialogProps) => {
	const { updateLibrarian, error } = useUpdateLibrarian();
	const handleSubmit = (data: LibrarianFormData) => {
		const payload: PatchLibrarianPayload = {
			account: {
				email: data.email == librarian.account.email ? undefined : data.email,
				fullname: data.fullname,
			},
			nip: data.nip == librarian.nip ? undefined : data.nip,
      phone_number: data.phoneNumber,
		};
		if (data.password) payload.account.password = data.password;
		updateLibrarian({ id: librarian.id, data: payload });
	};
	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Edit Book</DialogTitle>
				<LibrarianForm librarian={librarian} handleSubmit={handleSubmit} error={error} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default UpdateLibrarianDialog;
