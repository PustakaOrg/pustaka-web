import { BookOpen, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { ReservationStatus } from "~/types/entities/Reservation";

const statusLabel: Record<ReservationStatus, string> = {
	pending: "Menunggu",
	ready: "Siap",
	expired: "Expired",
	canceled: "Dibatalkan",
	completed: "Selesai",
};

const ReservationStatusBadge = ({ status }: { status: ReservationStatus }) => {
	return (
		<Badge
			variant={
				status === "pending"
					? "outline"
					: status === "ready"
						? "default"
						: status === "completed"
							? "secondary"
							: "destructive"
			}
		>
			<div className="flex items-center gap-1">
				{status === "pending" ? (
					<Clock className="h-3 w-3" />
				) : status === "ready" ? (
					<CheckCircle2 className="h-3 w-3" />
				) : status === "completed" ? (
					<BookOpen className="h-3 w-3" />
				) : (
					<XCircle className="h-3 w-3" />
				)}
				<span className="capitalize">{statusLabel[status]}</span>
			</div>
		</Badge>
	);
};

export default ReservationStatusBadge;
