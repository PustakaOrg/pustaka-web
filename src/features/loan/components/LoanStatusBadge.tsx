import { AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";
import { LoanStatus } from "~/types/entities/Loan";

const statusLabel: Record<LoanStatus, string> = {
	active: "Dipinjam",
	overdue: "Terlambat",
	done: "Selesai",
	lost: "Hilang",
	returned: "Dikembalikan",
};

const LoanStatusBadge = ({ status }: { status: LoanStatus }) => {
	return (
		<Badge
			variant={
				status === "active"
					? "default"
					: (status === "overdue" || status === "lost")
						? "destructive"
						: status === "done"
							? "success"
							: "success"
			}
		>
			<div className="flex items-center gap-1">
				{status === "active" ? (
					<BookOpen className="h-3 w-3" />
				) : status === "overdue" ? (
					<AlertCircle className="h-3 w-3" />
				) : (
					<CheckCircle2 className="h-3 w-3" />
				)}
				<span className="capitalize">{statusLabel[status]}</span>
			</div>
		</Badge>
	);
};

export default LoanStatusBadge;
