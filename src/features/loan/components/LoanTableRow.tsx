import { AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";
import { Badge } from "~/shared/components/ui/badge";

import { TableCell, TableRow } from "~/shared/components/ui/table";
import { formatDate } from "~/shared/utils/functions";
import { Loan } from "~/types/entities/Loan";
import LoanRowAction from "./LoanRowAction";
import { LoanColumnVisibility } from "../type/LoanColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";
import MemberListItem from "~/features/member/components/MemberListItem";
import LoanStatusBadge from "./LoanStatusBadge";

interface LoanTableRowProps {
	loan: Loan;
	onAction: (action: string, loan: Loan) => void;
	columnVisibility: LoanColumnVisibility;
	isSelected: boolean;
	onSelect: (loanId: string, checked: boolean) => void;
}

const LoanTableRow = ({
	loan,
	onAction,
	columnVisibility,
	isSelected,
	onSelect,
}: LoanTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) => onSelect(loan.id, checked as boolean)}
					aria-label={`Select ${loan.id}`}
				/>
			</TableCell>
			{columnVisibility.borrower && (
				<TableCell>
					<MemberListItem member={loan.borrower} />
				</TableCell>
			)}
			{columnVisibility.book && (
				<TableCell>
					<div className="flex items-center gap-3">
						<img
							src={loan.book.img || "/placeholder.svg"}
							alt={loan.book.title}
							width={32}
							height={48}
							className="rounded border hidden sm:block"
						/>
						<div>
							<p className="font-medium line-clamp-1">{loan.book.title}</p>
							<p className="text-xs text-muted-foreground">
								{loan.book.author?.fullname}
							</p>
						</div>
					</div>
				</TableCell>
			)}
			{columnVisibility.loan_date && (
				<TableCell>{formatDate(loan.loan_date)}</TableCell>
			)}
			{columnVisibility.return_date && (
				<TableCell>{formatDate(loan.return_date)}</TableCell>
			)}
			{columnVisibility.status && (
				<TableCell>
        <LoanStatusBadge status={loan.status} />
				</TableCell>
			)}

			{columnVisibility.approved_by && (
				<TableCell>
					{loan.approved_by ? loan.approved_by.account.fullname : "-"}
				</TableCell>
			)}
			{columnVisibility.return_procced_by && (
				<TableCell>Return Proceed By</TableCell>
			)}
			<TableCell className="text-right">
				<LoanRowAction loan={loan} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default LoanTableRow;
