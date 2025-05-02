import { TableCell, TableRow } from "~/shared/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "~/shared/components/ui/dropdown-menu";
import { Book } from "~/types/entities/Book";
import { Badge } from "~/shared/components/ui/badge";
import { Button } from "~/shared/components/ui/button";
import { BookOpen, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import useDeleteBook from "../hooks/useDeleteBook";

const BookRow = ({ book }: { book: Book }) => {
  const {deleteBook} = useDeleteBook(book.id)
	return (
		<TableRow >
			<TableCell>
				<div className="flex items-center gap-3">
					<img
						src={book.img || "/placeholder.svg"}
						alt={book.title}
						width={40}
						height={60}
						className="rounded border hidden sm:block"
					/>
					<div>
						<p className="font-medium">{book.title}</p>
						<p className="text-sm text-muted-foreground">{book.author}</p>
					</div>
				</div>
			</TableCell>
			<TableCell className="hidden md:table-cell">{book.isbn}</TableCell>
			<TableCell className="hidden md:table-cell">{book.category}</TableCell>
			<TableCell>
				<Badge variant={book.available_stock > 0 ? "outline" : "secondary"}>
					{book.available_stock}/{book.stock} available
				</Badge>
			</TableCell>
			<TableCell className="hidden md:table-cell">{book.shelf}</TableCell>
			<TableCell className="text-right">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
							<span className="sr-only">Actions</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<BookOpen className="mr-2 h-4 w-4" />
							View Details
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Edit className="mr-2 h-4 w-4" />
							Edit Book
						</DropdownMenuItem>
						<DropdownMenuItem>
							<BookOpen className="mr-2 h-4 w-4" />
							Issue Book
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={()=>{deleteBook()}} className="text-destructive">
							<Trash2 className="mr-2 h-4 w-4" />
							Delete Book
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	);
};

export default BookRow;
