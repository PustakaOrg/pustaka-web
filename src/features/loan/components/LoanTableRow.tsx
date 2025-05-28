import { AlertCircle, BookOpen, CheckCircle2 } from "lucide-react";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "~/shared/components/ui/avatar";
import { Badge } from "~/shared/components/ui/badge";

import { TableCell, TableRow } from "~/shared/components/ui/table";
import { formatDate } from "~/shared/utils/functions";
import { Loan } from "~/types/entities/Loan";
import LoanRowAction from "./LoanRowAction";
import { LoanColumnVisibility } from "../type/LoanColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";

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
					<div className="flex items-center gap-3">
						<Avatar className="h-8 w-8 hidden sm:flex">
							<AvatarImage
								src={loan.borrower.profile_picture}
								alt={loan.borrower.account.fullname}
							/>
							<AvatarFallback>
								{loan.borrower.account.fullname.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">{loan.borrower.account.fullname}</p>
							<p className="text-xs text-muted-foreground hidden md:block">
								{loan.borrower.account.email}
							</p>
						</div>
					</div>
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
					<Badge
						// @ts-ignore
						variant={
							loan.status === "active"
								? "outline"
								: loan.status === "overdue"
									? "destructive"
									: "success"
						}
					>
						<div className="flex items-center gap-1">
							{loan.status === "active" ? (
								<BookOpen className="h-3 w-3" />
							) : loan.status === "overdue" ? (
								<AlertCircle className="h-3 w-3" />
							) : (
								<CheckCircle2 className="h-3 w-3" />
							)}
							<span className="capitalize">{loan.status}</span>
						</div>
					</Badge>
				</TableCell>
			)}

			{columnVisibility.approved_by && <TableCell>{loan.approved_by ? loan.approved_by.account.fullname : "-"}</TableCell>}
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
