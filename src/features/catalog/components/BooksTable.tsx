import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { PaginatedResponse } from "~/types/responses";
import BookTableHeader from "./BookTableHeader";
import BookRow from "./BookRow";
import { Book } from "lucide-react";
import { Book as BookEntity } from "~/types/entities/Book";
import React from "react";
import useDeleteBook from "../hooks/useDeleteBook";

const BooksTable = React.memo(({
	bookList,
}: { bookList: PaginatedResponse<BookEntity> }) => {
  const {deleteBook} = useDeleteBook()
	return (
		<Table>
			<BookTableHeader />
			<TableBody>
				{bookList && bookList.results.length > 0 ? (
					bookList.results.map((book) => <BookRow key={book.id} book={book} deleteBook={deleteBook} />)
				) : (
					<TableRow>
						<TableCell colSpan={6} className="text-center py-8">
							<div className="flex flex-col items-center gap-2">
								<Book className="h-8 w-8 text-muted-foreground" />
								<p className="text-muted-foreground">No books found</p>
								<p className="text-sm text-muted-foreground">
									Try adjusting your search or filters
								</p>
							</div>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
});

export default BooksTable;
