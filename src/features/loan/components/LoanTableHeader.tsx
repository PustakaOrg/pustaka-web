import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { LoanColumnVisibility } from "../type/LoanColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";
import useProfile from "~/features/auth/hooks/useProfile";
import { isLibrarianObject, isMemberObject } from "~/features/auth/utils/util";

interface LoanTableHeaderProps {
	columnVisibility: LoanColumnVisibility;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	onSelectAll: (checked: boolean) => void;
}

const LoanTableHeader = ({
	columnVisibility,
	isAllSelected,
	isIndeterminate,
	onSelectAll,
}: LoanTableHeaderProps) => {
	const { profile } = useProfile();
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				{profile && !isMemberObject(profile) && (
					<TableHead className="w-12">
						<Checkbox
							checked={isAllSelected}
							onCheckedChange={onSelectAll}
							aria-label="Select all books"
							{...(isIndeterminate && { "data-state": "indeterminate" })}
						/>
					</TableHead>
				)}

				{columnVisibility.borrower && <TableHead>Borrower</TableHead>}
				{columnVisibility.book && <TableHead>Book</TableHead>}
				{columnVisibility.loan_date && <TableHead>Loan Date</TableHead>}
				{columnVisibility.return_date && <TableHead>Return Date</TableHead>}
				{columnVisibility.status && <TableHead>Status</TableHead>}
				{columnVisibility.approved_by && <TableHead>Approved By</TableHead>}
				{columnVisibility.return_procced_by && (
					<TableHead>Return Proceed By</TableHead>
				)}

				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default LoanTableHeader;
