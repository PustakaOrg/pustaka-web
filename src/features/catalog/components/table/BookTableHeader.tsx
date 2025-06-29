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
						aria-label="Pilih semua"
						{...(isIndeterminate && { "data-state": "indeterminate" })}
					/>
				</TableHead>
				{columnVisibility.book && <TableHead>Buku</TableHead>}
				{columnVisibility.isbn && <TableHead>ISBN</TableHead>}
				{columnVisibility.publisher && <TableHead>Penerbit</TableHead>}
				{columnVisibility.categories && <TableHead>Kategori</TableHead>}
				{columnVisibility.pages && (
					<TableHead className="text-right">Halaman</TableHead>
				)}
				{columnVisibility.year && (
					<TableHead className="text-right">Tahun</TableHead>
				)}
				{columnVisibility.stock && (
					<TableHead className="text-right">Stok</TableHead>
				)}
				{columnVisibility.shelf && <TableHead>Rak</TableHead>}
				<TableHead className="w-12">Aksi</TableHead>
			</TableRow>
		</TableHeader>
	);
};

export default BookTableHeader;
