import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { ChevronDown, Settings2 } from "lucide-react";
import { Checkbox } from "~/shared/components/ui/checkbox";
import { ColumnVisibility } from "../../types/BookColumnVisibility";

interface BookColumnVisibilityControlsProps {
	columnVisibility: ColumnVisibility;
	onToggleColumn: (column: keyof ColumnVisibility) => void;
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
		{ key: "image" as const, label: "Image" },
		{ key: "title" as const, label: "Title" },
		{ key: "isbn" as const, label: "ISBN" },
		{ key: "author" as const, label: "Author" },
		{ key: "publisher" as const, label: "Publisher" },
		{ key: "categories" as const, label: "Categories" },
		{ key: "pages" as const, label: "Pages" },
		{ key: "year" as const, label: "Year" },
		{ key: "stock" as const, label: "Stock" },
		{ key: "shelf" as const, label: "Shelf" },
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
					<DropdownMenuItem
						key={column.key}
						onClick={() => onToggleColumn(column.key)}
					>
						<Checkbox
							checked={columnVisibility[column.key]}
							className="mr-2"
							// readOnly
						/>
						{column.label}
					</DropdownMenuItem>
				))}

				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={onResetColumns}>Show All</DropdownMenuItem>
				<DropdownMenuItem onClick={onHideAllColumns}>Hide All</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BookColumnVisibilityControls;
