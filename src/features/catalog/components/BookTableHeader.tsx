import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
const BookTableHeader = () => {
	return (
		<TableHeader className="bg-muted">
			<TableRow>
				<TableHead>Book</TableHead>
				<TableHead className="hidden md:table-cell">ISBN</TableHead>
				<TableHead className="hidden md:table-cell">Category</TableHead>
				<TableHead>Status</TableHead>
				<TableHead className="hidden md:table-cell">Location</TableHead>
				<TableHead className="text-right">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default BookTableHeader;
