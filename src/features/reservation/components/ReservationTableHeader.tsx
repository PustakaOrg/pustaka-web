import { Checkbox } from "~/shared/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { ReservationColumnVisibility } from "../type/ReservationColumnVisibility";

interface ReservationTableHeaderProps {
	columnVisibility: ReservationColumnVisibility;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	onSelectAll: (checked: boolean) => void;
}

const ReservationTableHeader = ({
	columnVisibility,
	isAllSelected,
	isIndeterminate,
	onSelectAll,
}: ReservationTableHeaderProps) => {
	return (
		<TableHeader>
			<TableRow className="bg-secondary hover:bg-secondary">
				<TableHead className="w-12">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={onSelectAll}
						aria-label="Select all books"
						{...(isIndeterminate && { "data-state": "indeterminate" })}
					/>
				</TableHead>
				{columnVisibility.reservant && <TableHead>Member</TableHead>}
				{columnVisibility.book && <TableHead>Book</TableHead>}
				{columnVisibility.reservation_date && (
					<TableHead className="hidden md:table-cell">Reserved On</TableHead>
				)}
				{columnVisibility.pickup_date && <TableHead>Pickup By</TableHead>}
				{columnVisibility.day_to_loan && <TableHead>Day to Loan</TableHead>}
				{columnVisibility.status && <TableHead>Status</TableHead>}
				{columnVisibility.accepted_by && <TableHead>Accepted By</TableHead>}
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ReservationTableHeader;
