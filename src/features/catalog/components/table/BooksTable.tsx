import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { PaginatedResponse } from "~/types/responses";
import BookTableHeader from "./BookTableHeader";
import { Book as BookIcon } from "lucide-react";
import { Book, Book as BookEntity } from "~/types/entities/Book";
import React from "react";
import UpdateBookDialog from "../UpdateBookDialog";
import useBookDialog from "../../hooks/useBookDialog";
import { BookDetailDialog } from "../BookDetailDialog";
import { BookColumnVisibility } from "../../types/BookColumnVisibility";
import BookTableRow from "./BookTableRow";
import DeleteBookAlertDialog from "../DeleteBookAlertDialog";

interface BooksTableProps {
  bookList: PaginatedResponse<BookEntity>;
	columnVisibility: BookColumnVisibility;
	selectedBooks: string[];
	handleSelectAll: (checked: boolean) => void;
	handleSelectBook: (bookId: string, checked: boolean) => void;
}

const BooksTable = React.memo(
	({
		bookList,
		columnVisibility,
		selectedBooks,
		handleSelectAll,
		handleSelectBook,
	}: BooksTableProps) => {
		const {
			book: updateBook,
			isOpen: editDialogOpen,
			openDialog: openEditDialog,
			closeDialog: closeEditDialog,
		} = useBookDialog();

		const {
			book: bookDetail,
			isOpen: bookDetailOpen,
			closeDialog: closeBookDetail,
			openDialog: openBookDetailDialog,
		} = useBookDialog();

		const {
			book: bookDelete,
			isOpen: bookDeleteOpen,
			closeDialog: closeDeleteBook,
			openDialog: openBookDeleteDialog,
		} = useBookDialog();

		const handleRowAction = (action: string, book: Book) => {
			if (action === "view") {
				openBookDetailDialog(book);
			}

			if (action === "edit") {
				openEditDialog(book);
			}

			if (action === "delete") {
				openBookDeleteDialog(book);
			}
		};

		const isAllSelected =
			selectedBooks.length === bookList.results.length &&
			bookList.results.length > 0;
		const isIndeterminate =
			selectedBooks.length > 0 &&
			selectedBooks.length < bookList.results.length;

		return (
			<div>
					<Table>
						<BookTableHeader
							columnVisibility={columnVisibility}
							isAllSelected={isAllSelected}
							isIndeterminate={isIndeterminate}
							onSelectAll={handleSelectAll}
						/>
						<TableBody>
							{bookList && bookList.results.length > 0 ? (
								bookList.results.map((book) => (
									<BookTableRow
										key={book.id}
										book={book}
										columnVisibility={columnVisibility}
										isSelected={selectedBooks.includes(book.id)}
										onSelect={handleSelectBook}
										onAction={handleRowAction}
									/>
								))
							) : (
								<TableRow>
									<TableCell colSpan={12} className="text-center py-8">
										<div className="flex flex-col items-center gap-2">
											<BookIcon className="h-8 w-8 text-muted-foreground" />
											<p className="text-muted-foreground">Tidak ada buku ditemukan</p>
											<p className="text-sm text-muted-foreground">
                      Atur ulang pencarian atau filter.
																							</p>
										</div>
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					{updateBook && (
						<UpdateBookDialog
							isOpen={editDialogOpen}
							book={updateBook}
							onOpenChange={closeEditDialog}
						/>
					)}
					{bookDetail && (
						<BookDetailDialog
							book={bookDetail}
							onOpenChange={closeBookDetail}
							open={bookDetailOpen}
						/>
					)}
					{bookDelete && (
						<DeleteBookAlertDialog
							book={bookDelete}
							onOpenChange={closeDeleteBook}
							isOpen={bookDeleteOpen}
						/>
					)}
			</div>
		);
	},
);

export default BooksTable;
