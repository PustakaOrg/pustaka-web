import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { MemberColumnVisibility } from "../types/MemberColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";

interface MemberTableHeaderProps {
	columnVisibility: MemberColumnVisibility;
	onSelectAll: (checked: boolean) => void;
	isAllSelected: boolean;
}

const MemberTableHeader = ({
	columnVisibility,
	onSelectAll,
	isAllSelected,
}: MemberTableHeaderProps) => {
	return (
		<TableHeader className="bg-muted">
			<TableRow className="hover:bg-secondary bg-secondary">
				<TableHead className="w-12">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={onSelectAll}
						aria-label="Pilih semua member"
					/>
				</TableHead>
				{columnVisibility.member && <TableHead>Member</TableHead>}
				{columnVisibility.nis && <TableHead>NIS</TableHead>}
				{columnVisibility.phone_number && <TableHead>No. HP</TableHead>}
				{columnVisibility._class && <TableHead>Kelas</TableHead>}
				{columnVisibility.batch && <TableHead>Angkatan</TableHead>}
				{columnVisibility.expires_at && <TableHead>Berlaku sampai</TableHead>}
				<TableHead className="text-right">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default MemberTableHeader;
