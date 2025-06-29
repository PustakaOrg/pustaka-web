import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import LibrarianForm, { LibrarianFormData } from "./LibrarianForm";
import useAddLibrarian from "../hooks/useAddLibrarian";
import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject } from "~/features/auth/utils/util";
import { PostLibrarianPayload } from "../api/postLibrarian";

const AddLibrarianDialog = () => {
	const { newLibrarian, addLibrarian, error } = useAddLibrarian();
	const { profile } = useProfile();

	const handleSubmit = (data: LibrarianFormData) => {
		if (isAdminObject(profile)) {
			const payload: PostLibrarianPayload = {
				account: {
					email: data.email,
					fullname: data.fullname,
					password: data.password ?? "",
				},
				phone_number: data.phoneNumber,
				nip: data.nip,
			};
			addLibrarian(payload);
		}
	};
	return (
		<Dialog>
			<DialogTrigger asChild className="cursor-pointer">
				<Button>
					<Plus />
					Add Librarian
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Add New Librarian</DialogTitle>
				<LibrarianForm handleSubmit={handleSubmit} error={error} />
			</DialogContent>
		</Dialog>
	);
};

export default AddLibrarianDialog;
