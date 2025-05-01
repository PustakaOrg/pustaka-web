import { TableCell, TableRow } from "~/shared/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import { Reservation } from "~/types/entities/Reservation";
import {
	Badge,
	BookOpen,
	Calendar,
	CheckCircle2,
	Clock,
	Mail,
	MoreHorizontal,
	Trash2,
	XCircle,
} from "lucide-react";
import { Button } from "~/shared/components/ui/button";
import { formatDate } from "~/shared/utils/functions";

interface ReservationTableRowProps {
	reservation: Reservation;
}

const ReservationTableRow = ({ reservation }: ReservationTableRowProps) => {
	return (
		<TableRow key={reservation.id}>
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
						<p className="font-medium line-clamp-1">{reservation.book.title}</p>
						<p className="text-xs text-muted-foreground">
							{reservation.book.author}
						</p>
					</div>
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">
				{formatDate(reservation.reservation_date)}
			</TableCell>
			<TableCell>
				{reservation.pickup_date ? formatDate(reservation.pickup_date) : "N/A"}
			</TableCell>
			<TableCell>
				<Badge
					// @ts-ignore
					variant={
						reservation.status === "pending"
							? "outline"
							: reservation.status === "ready"
								? "success"
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
			<TableCell className="text-right">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Calendar className="mr-2 h-4 w-4" />
							View Details
						</DropdownMenuItem>
						{reservation.status === "pending" && (
							<DropdownMenuItem>
								<CheckCircle2 className="mr-2 h-4 w-4" />
								Mark as Ready
							</DropdownMenuItem>
						)}
						{reservation.status === "ready" && (
							<DropdownMenuItem>
								<BookOpen className="mr-2 h-4 w-4" />
								Convert to Loan
							</DropdownMenuItem>
						)}
						{(reservation.status === "pending" ||
							reservation.status === "ready") && (
							<>
								<DropdownMenuItem>
									<Mail className="mr-2 h-4 w-4" />
									Send Notification
								</DropdownMenuItem>
								<DropdownMenuItem>
									<XCircle className="mr-2 h-4 w-4" />
									Cancel Reservation
								</DropdownMenuItem>
							</>
						)}
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete Record
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default ReservationTableRow;
