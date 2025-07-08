import {
	BookOpen,
	Calendar,
	CheckCircle2,
	Mail,
	MoreHorizontal,
	Trash2,
	X,
	XCircle,
} from "lucide-react";
import useProfile from "~/features/auth/hooks/useProfile";
import { isAdminObject, isLibrarianObject } from "~/features/auth/utils/util";
import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Reservation } from "~/types/entities/Reservation";

interface ReservationRowActionProps {
	reservation: Reservation;
	onAction: (action: string, reservation: Reservation) => void;
}

const ReservationRowAction = ({
	reservation,
	onAction,
}: ReservationRowActionProps) => {
	const { profile } = useProfile();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Aksi</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("view-detail", reservation);
					}}
				>
					<Calendar className="mr-2 h-4 w-4" />
					Lihat detail
				</DropdownMenuItem>

				{profile && isLibrarianObject(profile) && (
					<>
						{reservation.status === "pending" && (
							<DropdownMenuItem
								onClick={() => {
									onAction("mark-ready", reservation);
								}}
							>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Tandai siap ambil
							</DropdownMenuItem>
						)}

						{reservation.status === "ready" && (
							<DropdownMenuItem
								onClick={() => {
									onAction("covert-loan", reservation);
								}}
							>
								<BookOpen className="mr-2 h-4 w-4" />
								Ubah ke Peminjaman
							</DropdownMenuItem>
						)}
					</>
				)}
				{profile && (isLibrarianObject(profile) || isAdminObject(profile)) && (
					<>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => onAction("delete", reservation)}
							className="cursor-pointer text-destructive"
							variant="destructive"
						>
							<Trash2 className="mr-2 h-4 w-4" />
							Delete
						</DropdownMenuItem>
					</>
				)}

				{(reservation.status === "pending" ||
					reservation.status === "ready") && (
					<>
						<DropdownMenuItem
							onClick={() => {
								onAction("cancel", reservation);
							}}
						>
							<XCircle className="mr-2 h-4 w-4" />
							Batalkan
						</DropdownMenuItem>
					</>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ReservationRowAction;
