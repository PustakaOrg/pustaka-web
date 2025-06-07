import { TableCell, TableRow } from "~/shared/components/ui/table";
import { Shelf } from "~/types/entities/Shelf";
import ShelfRowAction from "./ShelfRowAction";

interface ShelfTableRowProps {
	shelf: Shelf;
	onAction: (action: string, shelf: Shelf) => void;
}

const ShelfTableRow = ({ shelf, onAction }: ShelfTableRowProps) => {
	return (
		<TableRow>
			<TableCell className="w-[400px]">
				<p className="font-medium">{shelf.code}</p>
			</TableCell>
			<TableCell className="text-right">
				<ShelfRowAction shelf={shelf} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default ShelfTableRow;
