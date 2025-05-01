import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";

const ReservationTableHeader = () => {
	return (
		<TableHeader>
			<TableRow>
				<TableHead>Member</TableHead>
				<TableHead>Book</TableHead>
				<TableHead className="hidden md:table-cell">Reserved On</TableHead>
				<TableHead>Pickup By</TableHead>
				<TableHead>Status</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default ReservationTableHeader;
