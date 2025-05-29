import { Librarian } from "~/types/entities/Librarian";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from "~/shared/components/ui/dropdown-menu";
import { Button } from "~/shared/components/ui/button";
import { Edit, MoreHorizontal, Trash2, User } from "lucide-react";
interface LibrarianRowActionProps {
	librarian: Librarian;
	onAction: (action: string, librarian: Librarian) => void;
}

const LibrarianRowAction = ({
	librarian,
	onAction,
}: LibrarianRowActionProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="h-4 w-4" />
					<span className="sr-only">Actions</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					onClick={() => {
						onAction("view-detail", librarian);
					}}
				>
					<User className="mr-2 h-4 w-4" />
					View Details
				</DropdownMenuItem>

				<DropdownMenuItem
					onClick={() => {
						onAction("edit", librarian);
					}}
				>
					<Edit className="mr-2 h-4 w-4" />
					Edit Librarian
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onAction("delete", librarian)}
					className="text-destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LibrarianRowAction;
