import { Book } from "~/types/entities/Book";
import { BookColumnVisibility } from "../../types/BookColumnVisibility";
import { TableRow, TableCell } from "~/shared/components/ui/table";
import BookRowActionDropdown from "./BookRowActionDropdown";
import { Checkbox } from "~/shared/components/ui/checkbox";
import { Badge } from "~/shared/components/ui/badge";
import BookListItem from "../BookListItem";
interface BookTableRowProps {
	book: Book;
	columnVisibility: BookColumnVisibility;
	isSelected: boolean;
	onSelect: (bookId: string, checked: boolean) => void;
	onAction: (action: string, book: Book) => void;
}
const BookTableRow = ({
	book,
	columnVisibility,
	isSelected,
	onSelect,
	onAction,
}: BookTableRowProps) => {
	return (
		<TableRow>
			<TableCell>
				<Checkbox
					checked={isSelected}
					onCheckedChange={(checked) => onSelect(book.id, checked as boolean)}
					aria-label={`Select ${book.title}`}
				/>
			</TableCell>
			{columnVisibility.book && (
				<TableCell>
					<BookListItem book={book} />
				</TableCell>
			)}
			{columnVisibility.isbn && (
				<TableCell className="font-mono text-sm">{book.isbn}</TableCell>
			)}
			{columnVisibility.publisher && (
				<TableCell>
					<div>
						<div className="font-medium">{book.publisher?.name}</div>
						<div className="text-sm text-muted-foreground">
							{book.publisher?.city}
						</div>
					</div>
				</TableCell>
			)}
			{columnVisibility.categories && (
				<TableCell>
					<div className="flex flex-wrap gap-1">
						{book.category.map((cat) => (
							<Badge key={cat.id} variant="default" className="text-xs">
								{cat.name}
							</Badge>
						))}
					</div>
				</TableCell>
			)}
			{columnVisibility.pages && (
				<TableCell className="text-right">{book.pages}</TableCell>
			)}
			{columnVisibility.year && (
				<TableCell className="text-right">{book.publish_year}</TableCell>
			)}
			{columnVisibility.stock && (
				<TableCell className="text-right">
					<div>
						<div className="font-medium">
							{book.available_stock}/{book.stock}
						</div>
						<div className="text-xs text-muted-foreground">available</div>
					</div>
				</TableCell>
			)}
			{columnVisibility.shelf && (
				<TableCell>
					<Badge variant="outline">{book.shelf?.code}</Badge>
				</TableCell>
			)}
			<TableCell>
				<BookRowActionDropdown book={book} onAction={onAction} />
			</TableCell>
		</TableRow>
	);
};

export default BookTableRow;
