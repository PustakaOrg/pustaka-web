import React from "react";
import { FineColumnVisibility } from "../types/ColumnVisibility";
import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { Checkbox } from "~/shared/components/ui/checkbox";

interface FineTableHeaderProps {
	columnVisibility: FineColumnVisibility;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	onSelectAll: (checked: boolean) => void;
}
const FineTableHeader = ({
	columnVisibility,
	isAllSelected,
	isIndeterminate,
	onSelectAll,
}: FineTableHeaderProps) => {
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

				{columnVisibility.book && <TableHead>Buku</TableHead>}
				{columnVisibility.borrower && <TableHead>Member</TableHead>}

				{columnVisibility.loan_status && <TableHead>Status Peminjaman</TableHead>}
				{columnVisibility.amount && <TableHead>Total</TableHead>}
				{columnVisibility.payment_status && (
					<TableHead>Status Pembayaran</TableHead>
				)}

				<TableHead className="text-right">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default FineTableHeader;
