import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";
import { Plus } from "lucide-react";
import LoanForm from "./LoanForm";
import { FormEvent, useState } from "react";
import { formatDateYYYYMMDD } from "~/shared/utils/functions";
import { PostLoanPayload } from "../api/postLoan";
import useAddLoan from "../hooks/useAddLoan";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";

const AddLoanDialog = () => {
	const { profile, isPending: profilePending } = useProfile();
	const { addLoan, isPending } = useAddLoan();
	const [open, setOpen] = useState(false);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const book = String(form.get("book"));
		const borrower = String(form.get("borrower"));
		const day = Number(form.get("day"));
		const today = new Date();
		const returnDate = new Date(today);
		returnDate.setDate(today.getDate() + day);
		if (profile && isLibrarianObject(profile)) {
			const payload: PostLoanPayload = {
				book,
				borrower,
				loan_date: formatDateYYYYMMDD(today),
				return_date: formatDateYYYYMMDD(returnDate),
				approved_by: profile.id,
			};
			addLoan(payload);
			setOpen(false);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{profile && isLibrarianObject(profile) && (
					<Button>
						<Plus />
						Add New Loan
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Add New Loan</DialogTitle>
				<LoanForm handleSubmit={handleSubmit} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default AddLoanDialog;
