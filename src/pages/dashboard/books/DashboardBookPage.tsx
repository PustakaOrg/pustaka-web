import { useSearchParams } from "react-router";
import useBookList from "~/features/catalog/hooks/useBookList";
import { BookListParams } from "~/features/catalog/types/BookListParams";
import ContentHeader from "~/features/dashboard/components/ContentHeader";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

import { defaultParams } from "~/shared/utils/functions";
import BooksTable from "~/features/catalog/components/table/BooksTable";
import AddBookDialog from "~/features/catalog/components/AddBookDialog";
import BookColumnVisibilityControls from "~/features/catalog/components/table/BookColumnVisibilityControls";
import BookBulkActionBar from "~/features/catalog/components/table/BookBulkActionBar";
import {
	ColumnVisibility,
	defaultColumnVisibility,
} from "~/features/catalog/types/BookColumnVisibility";
import { useState } from "react";

const DashboardBookPage = () => {
	const [columnVisibility, setColumnVisibility] = useState<ColumnVisibility>(
		defaultColumnVisibility,
	);

	const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
	const [searchParams] = useSearchParams();

	const { bookList, isPending } = useBookList(
		defaultParams<BookListParams>({
			q: searchParams.get("q") ?? undefined,
			available: searchParams.has("available") ? "true" : undefined,
			category: searchParams.getAll("category"),
		}),
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

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedBooks(bookList!.results.map((book) => book.id));
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

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader
				title="Books"
				subtitle="Manage your library's book collection."
			/>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Book Catalog</CardTitle>
						<CardDescription>
							{bookList?.results.length} books found
						</CardDescription>
					</div>
					<div>
						<AddBookDialog />
					</div>
				</CardHeader>
				<CardContent className="">
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

					{bookList && (
						<BooksTable
							bookList={bookList}
							columnVisibility={columnVisibility}
              selectedBooks={selectedBooks}
              handleSelectBook={handleSelectBook}
              handleSelectAll={handleSelectAll}
						/>
					)}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardBookPage;
