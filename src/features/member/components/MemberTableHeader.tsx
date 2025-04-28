import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const MemberTableHeader = () => {
	return (
		<TableHeader className="bg-muted">
			<TableRow>
				<TableHead>Member</TableHead>
				<TableHead className="hidden md:table-cell">NIS</TableHead>
				{/* <TableHead className="hidden md:table-cell">Type</TableHead> */}
				{/* <TableHead>Status</TableHead> */}
				<TableHead className="hidden md:table-cell">Phone Number</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default MemberTableHeader;
