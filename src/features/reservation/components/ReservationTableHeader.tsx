import { Checkbox } from "~/shared/components/ui/checkbox";
import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { ReservationColumnVisibility } from "../type/ReservationColumnVisibility";
import useProfile from "~/features/auth/hooks/useProfile";
import { isMemberObject } from "~/features/auth/utils/util";

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
				{columnVisibility.reservant && <TableHead>Member</TableHead>}
				{columnVisibility.book && <TableHead>Buku</TableHead>}
				{columnVisibility.reservation_date && (
					<TableHead className="hidden md:table-cell">Tanggal Reservasi</TableHead>
				)}
				{columnVisibility.pickup_date && <TableHead>Tanggal ambil</TableHead>}
				{columnVisibility.day_to_loan && <TableHead>Jumlah Hari</TableHead>}
				{columnVisibility.status && <TableHead>Status</TableHead>}
				{columnVisibility.accepted_by && <TableHead>Diterima oleh</TableHead>}
				<TableHead className="text-right">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ReservationTableHeader;
