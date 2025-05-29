import { TableCell, TableRow } from "~/shared/components/ui/table";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import { Reservation } from "~/types/entities/Reservation";
import { BookOpen, CheckCircle2, Clock, XCircle } from "lucide-react";
import { formatDate } from "~/shared/utils/functions";
import { Badge } from "~/shared/components/ui/badge";
import { ReservationColumnVisibility } from "../type/ReservationColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";
import ReservationRowAction from "./ReservationRowAction";

interface ReservationTableRowProps {
	reservation: Reservation;

	onAction: (action: string, reservation: Reservation) => void;
	columnVisibility: ReservationColumnVisibility;
	isSelected: boolean;
	onSelect: (reservationId: string, checked: boolean) => void;
}

const ReservationTableRow = ({
	reservation,
	onAction,
	columnVisibility,
	isSelected,
	onSelect,
}: ReservationTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) =>
						onSelect(reservation.id, checked as boolean)
					}
					aria-label={`Select ${reservation.id}`}
				/>
			</TableCell>

			{columnVisibility.reservant && (
				<TableCell>
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8 hidden sm:flex">
							<AvatarImage
								src={reservation.reservant.profile_picture}
								alt={reservation.reservant.account.fullname}
							/>
							<AvatarFallback>
								{reservation.reservant.account.fullname.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">
								{reservation.reservant.account.fullname}
							</p>
							<p className="text-xs text-muted-foreground hidden md:block">
								{reservation.reservant.account.email}
							</p>
						</div>
					</div>
				</TableCell>
			)}
			{columnVisibility.book && (
				<TableCell>
					<div className="flex items-center gap-3">
						<img
							src={reservation.book.img || "/placeholder.svg"}
							alt={reservation.book.title}
							width={32}
							height={48}
							className="rounded border hidden sm:block"
						/>
						<div>
							<p className="font-medium line-clamp-1">
								{reservation.book.title}
							</p>
							<p className="text-xs text-muted-foreground">
								{reservation.book.author?.fullname}
							</p>
						</div>
					</div>
				</TableCell>
			)}
			{columnVisibility.reservation_date && (
				<TableCell className="hidden md:table-cell">
					{formatDate(reservation.reservation_date)}
				</TableCell>
			)}

			{columnVisibility.pickup_date && (
				<TableCell>
					{reservation.pickup_date
						? formatDate(reservation.pickup_date)
						: "N/A"}
				</TableCell>
			)}


			{columnVisibility.day_to_loan && (
				<TableCell>
        {reservation.day_to_loan}
				</TableCell>
			)}

			{columnVisibility.status && (
				<TableCell>
					<Badge
						variant={
							reservation.status === "pending"
								? "outline"
								: reservation.status === "ready"
									? "default"
									: reservation.status === "completed"
										? "secondary"
										: "destructive"
						}
					>
						<div className="flex items-center gap-1">
							{reservation.status === "pending" ? (
								<Clock className="h-3 w-3" />
							) : reservation.status === "ready" ? (
								<CheckCircle2 className="h-3 w-3" />
							) : reservation.status === "completed" ? (
								<BookOpen className="h-3 w-3" />
							) : (
								<XCircle className="h-3 w-3" />
							)}
							<span className="capitalize">{reservation.status}</span>
						</div>
					</Badge>
				</TableCell>
			)}

			{columnVisibility.accepted_by && (
				<TableCell>
					{reservation.accepted_by
						? reservation.accepted_by.account.fullname
						: "-"}
				</TableCell>
			)}

			<TableCell className="text-right">
				<ReservationRowAction reservation={reservation} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default ReservationTableRow;
