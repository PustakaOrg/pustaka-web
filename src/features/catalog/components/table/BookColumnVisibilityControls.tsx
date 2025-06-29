import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { ChevronDown, Settings2 } from "lucide-react";
import { BookColumnVisibility } from "../../types/BookColumnVisibility";
import { Checkbox } from "~/shared/components/ui/checkbox";

interface BookColumnVisibilityControlsProps {
	columnVisibility: BookColumnVisibility;
	onToggleColumn: (column: keyof BookColumnVisibility) => void;
	onResetColumns: () => void;
	onHideAllColumns: () => void;
}

const BookColumnVisibilityControls = ({
	columnVisibility,
	onToggleColumn,
	onResetColumns,
	onHideAllColumns,
}: BookColumnVisibilityControlsProps) => {
	const columns = [
		{ key: "book" as const, label: "Buku" },
		{ key: "isbn" as const, label: "ISBN" },
		{ key: "publisher" as const, label: "Penerbit" },
		{ key: "categories" as const, label: "Kategori" },
		{ key: "pages" as const, label: "Halaman" },
		{ key: "year" as const, label: "Tahun" },
		{ key: "stock" as const, label: "Stok" },
		{ key: "shelf" as const, label: "Rak" },
	];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm">
					<Settings2 className="h-4 w-4 mr-2" />
					Columns
					<ChevronDown className="h-4 w-4 ml-2" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-48">
				<DropdownMenuLabel>Toggle Columns</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{columns.map((column) => (
					<DropdownMenuCheckboxItem
						key={column.key}
						onClick={() => onToggleColumn(column.key)}
						checked={columnVisibility[column.key]}
					>
						{column.label}
					</DropdownMenuCheckboxItem>
				))}

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onResetColumns}>Show All</DropdownMenuItem>
				<DropdownMenuItem onClick={onHideAllColumns}>Hide All</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BookColumnVisibilityControls;
