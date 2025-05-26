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
import React, { useCallback } from "react";
import useDeleteBook from "../hooks/useDeleteBook";
import useUpdateBookDialog from "../hooks/useUpdateBookDialog";
import UpdateBookDialog from "./UpdateBookDialog";

const BooksTable = React.memo(
	({ bookList }: { bookList: PaginatedResponse<BookEntity> }) => {
		const { deleteBook } = useDeleteBook();
		const { book, isOpen, openDialog, closeDialog } = useUpdateBookDialog();
		const handleDeleteBook = useCallback((bookId: string) => {
			deleteBook(bookId);
		}, []);
		return (
			<Table>
				<BookTableHeader />
				<TableBody>
					{bookList && bookList.results.length > 0 ? (
						bookList.results.map((book) => (
							<BookRow
								key={book.id}
								book={book}
								openEditDialog={openDialog}
								deleteBook={handleDeleteBook}
							/>
						))
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
				{book && (
					<UpdateBookDialog
						isOpen={isOpen}
						book={book}
						onOpenChange={closeDialog}
					/>
				)}
			</Table>
		);
	},
);

export default BooksTable;
