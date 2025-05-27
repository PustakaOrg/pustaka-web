import { BookOpen, Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "~/shared/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { Book } from "~/types/entities/Book";



interface RowActionsDropdownProps {
	book: Book;
	onAction: (action: "view" | "edit" | "delete", book: Book) => void;
}

const BookRowActionDropdown = ({
	book,
	onAction,
}: RowActionsDropdownProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => onAction("view", book)}>
					<Eye className="mr-2 h-4 w-4" />
					View Details
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => onAction("edit", book)}>
					<Edit className="mr-2 h-4 w-4" />
					Edit Book
				</DropdownMenuItem>
				{/* <DropdownMenuItem onClick={() => onAction("borrow", bookId)}> */}
				{/* 	<BookOpen className="mr-2 h-4 w-4" /> */}
				{/* 	Borrow Book */}
				{/* </DropdownMenuItem> */}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onAction("delete", book)}
					className="text-destructive"
				>
					<Trash2 className="mr-2 h-4 w-4" />
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default BookRowActionDropdown;
