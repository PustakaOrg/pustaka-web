
import { Shelf } from "~/types/entities/Shelf";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2 } from "lucide-react";

interface ShelfRowActionProps {
	shelf: Shelf;
	onAction: (action: string, shelf: Shelf) => void;
}
const ShelfRowAction = ({  shelf, onAction }: ShelfRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild className="cursor-pointer">
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Aksi</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("edit", shelf);
					}}
					className="cursor-pointer"
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Rak
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onAction("delete", shelf)}
					className="cursor-pointer text-destructive"
					variant="destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ShelfRowAction;
