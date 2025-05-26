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
import React, { useCallback, useEffect } from "react";
import useDeleteBook from "../hooks/useDeleteBook";
import UpdateBookDialog from "./UpdateBookDialog";
import useBookDialog from "../hooks/useBookDialog";
import { BookDetailDialog } from "./BookDetailDialog";

const BooksTable = React.memo(
	({ bookList }: { bookList: PaginatedResponse<BookEntity> }) => {
		const { deleteBook } = useDeleteBook();
		const {
			book: updateBook,
			isOpen,
			openDialog,
			closeDialog,
		} = useBookDialog();
		const {
			book: bookDetail,
			isOpen: bookDetailOpen,
			closeDialog: closeBookDetail,
      openDialog: openBookDetailDialog
		} = useBookDialog();
		const handleDeleteBook = useCallback((bookId: string) => {
			deleteBook(bookId);
		}, []);

    useEffect(()=>{
      console.log("IS OPEN" + bookDetailOpen)

    },[bookDetailOpen])


		return (
      <>
			<Table>
				<BookTableHeader />
				<TableBody>
					{bookList && bookList.results.length > 0 ? (
						bookList.results.map((book) => (
							<BookRow
								key={book.id}
								book={book}
								openEditDialog={openDialog}
                openDetailDialog={openBookDetailDialog}
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
			</Table>



				{updateBook && (
					<UpdateBookDialog
						isOpen={isOpen}
						book={updateBook}
						onOpenChange={closeDialog}
					/>
				)}
				{bookDetail && (
					<BookDetailDialog
						book={bookDetail}
						onOpenChange={closeBookDetail}
						open={bookDetailOpen}
					/>
				)}
      </>
		);
	},
);

export default BooksTable;
