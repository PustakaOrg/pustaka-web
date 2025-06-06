import { TableHead, TableHeader, TableRow } from "~/shared/components/ui/table";
import { BookColumnVisibility } from "../../types/BookColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";

interface BooksTableHeaderProps {
	columnVisibility: BookColumnVisibility;
	isAllSelected: boolean;
	isIndeterminate: boolean;
	onSelectAll: (checked: boolean) => void;
}

const BookTableHeader = ({
	columnVisibility,
	isAllSelected,
	isIndeterminate,
	onSelectAll,
}: BooksTableHeaderProps) => {
	return (
		<TableHeader>
			<TableRow className="hover:bg-secondary bg-secondary">
				<TableHead className="w-12">
					<Checkbox
						checked={isAllSelected}
						onCheckedChange={onSelectAll}
						aria-label="Select all books"
						{...(isIndeterminate && { "data-state": "indeterminate" })}
					/>
				</TableHead>
				{columnVisibility.book && <TableHead>Book</TableHead>}
				{columnVisibility.isbn && <TableHead>ISBN</TableHead>}
				{columnVisibility.publisher && <TableHead>Publisher</TableHead>}
				{columnVisibility.categories && <TableHead>Categories</TableHead>}
				{columnVisibility.pages && (
					<TableHead className="text-right">Pages</TableHead>
				)}
				{columnVisibility.year && (
					<TableHead className="text-right">Year</TableHead>
				)}
				{columnVisibility.stock && (
					<TableHead className="text-right">Stock</TableHead>
				)}
				{columnVisibility.shelf && <TableHead>Shelf</TableHead>}
				<TableHead className="w-12">Actions</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default BookTableHeader;
