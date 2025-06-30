import { Button } from "~/shared/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "~/shared/components/ui/dialog";

import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject } from "~/features/auth/utils/util";
import { FormEvent, useState } from "react";
import { Plus } from "lucide-react";
import ReservationForm from "./ReservationForm";
import useAddReservation from "../hooks/useAddReservation";
import { PostReservationPayload } from "../api/postReservation";
import { format } from "date-fns";

const AddReservationDialog = () => {
	const { profile, isPending: profilePending } = useProfile();
	const { addReservation } = useAddReservation();
	const [open, setOpen] = useState(false);
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = new FormData(e.currentTarget);
		const book = String(form.get("book"));
		const borrower = String(form.get("borrower"));
		const day = Number(form.get("day"));
		const pickUpDate = String(form.get("pick_up_date"));
		if (profile && isLibrarianObject(profile)) {
			const payload: PostReservationPayload = {
				reservation_date: format(new Date(), "yyyy-MM-dd"),
				reservant: borrower,
				day_to_loan: day,
				pickup_date: pickUpDate,
				book: book,
			};
			addReservation(payload);
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{profile && isLibrarianObject(profile) && (
					<Button>
						<Plus />
						Reservasi
					</Button>
				)}
			</DialogTrigger>
			<DialogContent className="min-w-[90vw] lg:min-w-[70vw] max-h-[98vh] overflow-y-auto">
				<DialogTitle>Tambah Reservasi</DialogTitle>
				<ReservationForm handleSubmit={handleSubmit} />
			</DialogContent>
			<DialogFooter></DialogFooter>
		</Dialog>
	);
};

export default AddReservationDialog;
