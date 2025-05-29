import { AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";
import React from "react";
import { Badge } from "~/shared/components/ui/badge";
import { LoanStatus } from "~/types/entities/Loan";

const LoanStatusBadge = ({ status }: { status: LoanStatus }) => {
	return (
		<Badge
			variant={
				status === "active"
					? "default"
					: status === "overdue"
						? "destructive"
						: "secondary"
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
				<span className="capitalize">{status}</span>
			</div>
		</Badge>
	);
};

export default LoanStatusBadge;
