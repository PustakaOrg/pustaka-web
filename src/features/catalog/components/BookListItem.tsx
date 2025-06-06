import { Book } from "~/types/entities/Book";

const BookListItem = ({book}: {book: Book}) => {
	return (
		<div className="flex items-center gap-3">
			<img
				src={book.img || "/placeholder.svg"}
				alt={book.title}
				width={32}
				height={48}
				className="rounded border hidden sm:block"
			/>
			<div className="overflow-hidden">
				<p className="font-medium  truncate">{book.title}</p>
				<p className="text-xs text-muted-foreground">{book.author?.fullname}</p>
			</div>
		</div>
	);
};

export default BookListItem;
