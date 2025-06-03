import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Checkbox } from "~/shared/components/ui/checkbox";
import MemberListItem from "~/features/member/components/MemberListItem";
import { Fine } from "~/types/entities/Fine";
import { FineColumnVisibility } from "../types/ColumnVisibility";
import LoanStatusBadge from "~/features/loan/components/LoanStatusBadge";
import BookListItem from "~/features/catalog/components/BookListItem";
import FineRowAction from "./FineRowAction";
import PaymentStatusBadge from "./PaymentStatusBadge";
import { formatToIDR } from "~/shared/utils/functions";

interface FineTableRowProps {
	fine: Fine;
	onAction: (action: string, fien: Fine) => void;
	columnVisibility: FineColumnVisibility;
	isSelected: boolean;
	onSelect: (fineId: string, checked: boolean) => void;
}

const FineTableRow = ({
	fine,
	onAction,
	columnVisibility,
	isSelected,
	onSelect,
}: FineTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) => onSelect(fine.id, checked as boolean)}
					aria-label={`Select ${fine.id}`}
				/>
			</TableCell>
			{columnVisibility.book && (
				<TableCell>
					<BookListItem book={fine.loan.book} />
				</TableCell>
			)}
			{columnVisibility.borrower && (
				<TableCell>
					<MemberListItem member={fine.loan.borrower} />
				</TableCell>
			)}

			{columnVisibility.loan_status && (
				<TableCell>
					<LoanStatusBadge status={fine.loan.status} />
				</TableCell>
			)}

			{columnVisibility.amount && (
				<TableCell>{formatToIDR(Number(fine.amount))}</TableCell>
			)}

			{columnVisibility.payment_status && (
				<TableCell>
					<PaymentStatusBadge status={fine.payment.status} />
				</TableCell>
			)}

			<TableCell className="text-right">
				<FineRowAction fine={fine} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default FineTableRow;
