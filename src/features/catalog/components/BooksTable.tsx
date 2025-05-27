import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "~/shared/components/ui/table";
import { PaginatedResponse } from "~/types/responses";
import BookTableHeader from "./BookTableHeader";
import BookRow from "./BookRow";
import { Book as BookIcon } from "lucide-react";
import { Book, Book as BookEntity } from "~/types/entities/Book";
import React, { useCallback, useState } from "react";
import useDeleteBook from "../hooks/useDeleteBook";
import UpdateBookDialog from "./UpdateBookDialog";
import useBookDialog from "../hooks/useBookDialog";
import { BookDetailDialog } from "./BookDetailDialog";
import {
	ColumnVisibility,
	defaultColumnVisibility,
} from "../types/BookColumnVisibility";
import BookColumnVisibilityControls from "./BookColumnVisibilityControls";
import BookBulkActionBar from "./BookBulkActionBar";
import BookTableRow from "./BookTableRow";

const BooksTable = React.memo(
	({ bookList }: { bookList: PaginatedResponse<BookEntity> }) => {
		const { deleteBook } = useDeleteBook();
		const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
		const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
			defaultColumnVisibility,
		);

		const toggleColumn = (column: keyof ColumnVisibility) => {
			setColumnVisibility((prev) => ({
				...prev,
				[column]: !prev[column],
			}));
		};

		const resetColumns = () => {
			setColumnVisibility(defaultColumnVisibility);
		};

		const hideAllColumns = () => {
			setColumnVisibility({
				image: false,
				title: false,
				isbn: false,
				author: false,
				publisher: false,
				categories: false,
				pages: false,
				year: false,
				stock: false,
				shelf: false,
			});
		};
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

		const handleDeleteBook = useCallback((bookId: string) => {
			deleteBook(bookId);
		}, []);

		const handleSelectAll = (checked: boolean) => {
			if (checked) {
				setSelectedBooks(bookList.results.map((book) => book.id));
			} else {
				setSelectedBooks([]);
			}
		};

		const handleSelectBook = (bookId: string, checked: boolean) => {
			if (checked) {
				setSelectedBooks((prev) => [...prev, bookId]);
			} else {
				setSelectedBooks((prev) => prev.filter((id) => id !== bookId));
			}
		};

		const handleBulkDelete = () => {
			setSelectedBooks([]);
		};

		const handleBulkExport = () => {
			console.log("Bulk export books:", selectedBooks);
		};

		const handleRowAction = (action: string, book: Book) => {
			console.log(`${action} book:`, book);
			if (action === "view") {
				openBookDetailDialog(book);
			}

			if (action === "edit") {
				openEditDialog(book);
			}

			if (action === "delete") {
			}
		};

		const isAllSelected =
			selectedBooks.length === bookList.results.length &&
			bookList.results.length > 0;
		const isIndeterminate =
			selectedBooks.length > 0 &&
			selectedBooks.length < bookList.results.length;

		return (
			<div className="space-y-4">
				<div className="flex items-center justify-end">
					<BookColumnVisibilityControls
						columnVisibility={columnVisibility}
						onToggleColumn={toggleColumn}
						onResetColumns={resetColumns}
						onHideAllColumns={hideAllColumns}
					/>
				</div>

				<BookBulkActionBar
					selectedCount={selectedBooks.length}
					onBulkExport={handleBulkExport}
					onBulkDelete={handleBulkDelete}
				/>

				<div className="border rounded-lg overflow-clip">
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
									<TableCell colSpan={6} className="text-center py-8">
										<div className="flex flex-col items-center gap-2">
											<BookIcon className="h-8 w-8 text-muted-foreground" />
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
				</div>
			</div>
		);
	},
);

export default BooksTable;
