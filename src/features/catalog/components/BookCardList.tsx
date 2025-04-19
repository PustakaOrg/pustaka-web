import { Book } from "~/types/entities/Book";
import BookCard from "./BookCard";

interface BookCardListProps {
	books: Book[];
}

const BookCardList = ({ books }: BookCardListProps) => {
	return (
		<>
			{books.map((book) => (
				<BookCard key={book.id} book={book} />
			))}
		</>
	);
};

export default BookCardList;
