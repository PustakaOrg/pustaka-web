import { useSearchParams } from "react-router";
import useBookList from "~/features/catalog/hooks/useBookList";
import { BookListParams } from "~/features/catalog/types/BookListParams";
import ContentHeader from "~/features/dashboard/components/ContentHeader";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "~/shared/components/ui/card";

import { defaultParams } from "~/shared/utils/functions";
import BooksTable from "~/features/catalog/components/table/BooksTable";
import AddBookDialog from "~/features/catalog/components/AddBookDialog";
import BookColumnVisibilityControls from "~/features/catalog/components/table/BookColumnVisibilityControls";
import BookBulkActionBar from "~/features/catalog/components/table/BookBulkActionBar";
import {
	BookColumnVisibility,
	defaultColumnVisibility,
} from "~/features/catalog/types/BookColumnVisibility";
import { FormEvent, useCallback, useState } from "react";
import { Pagination } from "~/shared/components/Pagination";
import { Input } from "~/shared/components/ui/input";
import { Search } from "lucide-react";
import useDialogWithData from "~/shared/hooks/useDialogWithData";
import { BookCSV, bookToCSV } from "~/features/catalog/types/BookCSV";
import ExportCSVDialog from "~/shared/components/ExportCSVDialog";
import useAuthorList from "~/features/catalog/hooks/useAuthorList";
import usePublisherList from "~/features/catalog/hooks/usePublisherList";
import AddAuthorDialog from "~/features/catalog/components/AddAuthorDialog";
import AuthorTable from "~/features/catalog/components/AuthorTable";
import AddPublisherDialog from "~/features/catalog/components/AddPublisherDialog";
import PublisherTable from "~/features/catalog/components/PublisherTable";
import useShelfList from "~/features/catalog/hooks/useShelfList";
import AddShelfDialog from "~/features/catalog/components/AddShelfDialog";
import ShelfTable from "~/features/catalog/components/ShelfTable";
import useCategoryList from "~/features/catalog/hooks/useCategoryList";
import AddCategoryDialog from "~/features/catalog/components/AddCategoryDialog";
import CategoryTable from "~/features/catalog/components/CategoryTable";
import { Book } from "~/types/entities/Book";
import BookStickerPrintDialog from "~/features/catalog/components/BookStickerPrintDialog";
import ShowPerPage from "~/shared/components/ShowPerPage";
import ImportBookDialog from "~/features/catalog/components/ImportBookDialog";
import { useSearchPagination } from "~/shared/hooks/useSearchPagination";

const DashboardBookPage = () => {
	const [columnVisibility, setColumnVisibility] =
		useState<BookColumnVisibility>(defaultColumnVisibility);

	const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();

	const bookListParams = {
		q: searchParams.get("q") ?? undefined,
		available: searchParams.has("available") ? "true" : undefined,
		category: searchParams.getAll("category"),
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 10,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
	};

	const { bookList, isPending } = useBookList(
		defaultParams<BookListParams>(bookListParams),
	);

	const {
		data: bookCsv,
		isOpen,
		openDialog,
		closeDialog,
	} = useDialogWithData<BookCSV>();

	const {
		data: printBook,
		isOpen: printOpen,
		openDialog: openPrintDialog,
		closeDialog: closePrintDialog,
	} = useDialogWithData<Book[]>();

	const toggleColumn = (column: keyof BookColumnVisibility) => {
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
			book: false,
			isbn: false,
			publisher: false,
			categories: false,
			pages: false,
			year: false,
			stock: false,
			shelf: false,
		});
	};
	const handleOffsetChange = useCallback((newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));
			return prev;
		});
	}, []);

	const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const q = formData.get("q");

		setSearchParams((prev) => {
			prev.set("q", String(q));
			return prev;
		});
	}, []);

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

	const handleBulkAction = (action: string) => {
		const bulkBook = bookList?.results.filter((b) =>
			selectedBooks.includes(b.id),
		);
		if (action === "export") {
			if (bulkBook) {
				const bookCsv = bookToCSV(bulkBook);
				openDialog(bookCsv);
			}
		}
		if (action === "print") {
			if (bulkBook) {
				openPrintDialog(bulkBook);
			}
		}
	};

	const publisher = useSearchPagination();
	const category = useSearchPagination();
	const author = useSearchPagination();
	const shelf = useSearchPagination();

	const { publisherList } = usePublisherList(publisher.params);

	const { categoryList } = useCategoryList(category.params);

	const { authorList } = useAuthorList(author.params);

	const { shelfList } = useShelfList(shelf.params);

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			{printBook && (
				<BookStickerPrintDialog
					books={printBook}
					isOpen={printOpen}
					onOpenChange={closePrintDialog}
				/>
			)}
			{bookCsv && (
				<ExportCSVDialog
					data={bookCsv}
					isOpen={isOpen}
					onOpenChange={closeDialog}
					defaulFileName="Book"
				/>
			)}
			<ContentHeader
				title="Katalog"
				subtitle="Kelola katalog di perpustakaan ini."
			/>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Buku</CardTitle>
						<CardDescription>
							{bookList?.results.length} ditemukan
						</CardDescription>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<ImportBookDialog />
						<AddBookDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center gap-2 justify-between ">
						<div className="flex gap-2 flex-wrap">
							<div className="relative ">
								<form onSubmit={handleSearchSubmit}>
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Cari judul, atau ISBN..."
										className="w-full pl-9 pr-4"
										defaultValue={searchParams.get("?") ?? undefined}
										name="q"
									/>
									<button hidden type="submit">
										Test
									</button>
								</form>
							</div>
							<div>
								<ShowPerPage />
							</div>
							<div>
								<BookColumnVisibilityControls
									columnVisibility={columnVisibility}
									onToggleColumn={toggleColumn}
									onResetColumns={resetColumns}
									onHideAllColumns={hideAllColumns}
								/>
							</div>
						</div>
					</div>

					<BookBulkActionBar
						selectedCount={selectedBooks.length}
						onAction={handleBulkAction}
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

					<CardFooter className="flex items-center justify-center mt-8">
						{bookList && (
							<Pagination
								totalCount={bookList.count}
								limit={bookListParams.limit}
								offset={bookListParams.offset ?? 0}
								onOffsetChange={handleOffsetChange}
							/>
						)}
					</CardFooter>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Kategori</CardTitle>
						<CardDescription>
							{categoryList?.results.length ?? 0} Kategori ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddCategoryDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center  gap-2 justify-between">
						<div className="flex gap-2">
							<div className="relative ">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const q = new FormData(e.currentTarget).get("q") as string;
										category.setQuery(q);
									}}
								>
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Cari Kategori"
										className="w-full pl-9 pr-4"
										name="q"
									/>
									<button hidden type="submit"></button>
								</form>
							</div>
						</div>
					</div>
					{categoryList && <CategoryTable categoryList={categoryList} />}
				</CardContent>

				<CardFooter className="flex items-center justify-center">
					{categoryList && (
						<Pagination
							totalCount={categoryList.count}
							limit={category.params.limit}
							offset={category.params.offset ?? 0}
							onOffsetChange={category.setOffset}
						/>
					)}
				</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Author</CardTitle>
						<CardDescription>
							{authorList?.results.length ?? 0} author ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddAuthorDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center  gap-2 justify-between">
						<div className="flex gap-2">
							<div className="relative ">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const q = new FormData(e.currentTarget).get("q") as string;
										author.setQuery(q);
									}}
								>
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Cari Author"
										className="w-full pl-9 pr-4"
										name="q"
									/>
									<button hidden type="submit"></button>
								</form>
							</div>
						</div>
					</div>
					{authorList && <AuthorTable authorList={authorList} />}
				</CardContent>

				<CardFooter className="flex items-center justify-center">
					{authorList && (
						<Pagination
							totalCount={authorList.count}
							limit={author.params.limit}
							offset={author.params.offset ?? 0}
							onOffsetChange={author.setOffset}
						/>
					)}
				</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Rak</CardTitle>
						<CardDescription>
							{shelfList?.results.length ?? 0} rak ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddShelfDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center  gap-2 justify-between">
						<div className="flex gap-2">
							<div className="relative ">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const q = new FormData(e.currentTarget).get("q") as string;
										shelf.setQuery(q);
									}}
								>
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Cari Rak"
										className="w-full pl-9 pr-4"
										name="q"
									/>
									<button hidden type="submit"></button>
								</form>
							</div>
						</div>
					</div>

					{shelfList && <ShelfTable shelfList={shelfList} />}
				</CardContent>

				<CardFooter className="flex items-center justify-center">
					{shelfList && (
						<Pagination
							totalCount={shelfList.count}
							limit={shelf.params.limit}
							offset={shelf.params.offset ?? 0}
							onOffsetChange={shelf.setOffset}
						/>
					)}
				</CardFooter>
			</Card>

			<Card>
				<CardHeader className="flex justify-between">
					<div>
						<CardTitle>Penerbit</CardTitle>
						<CardDescription>
							{publisherList?.results.length ?? 0} penerbit ditemukan.
						</CardDescription>
					</div>
					<div>
						<AddPublisherDialog />
					</div>
				</CardHeader>
				<CardContent className="space-y-2">
					<div className="flex items-center  gap-2 justify-between">
						<div className="flex gap-2">
							<div className="relative ">
								<form
									onSubmit={(e) => {
										e.preventDefault();
										const q = new FormData(e.currentTarget).get("q") as string;
										publisher.setQuery(q);
									}}
								>
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<Input
										type="text"
										placeholder="Cari Penerbit"
										className="w-full pl-9 pr-4"
										name="q"
									/>
									<button hidden type="submit"></button>
								</form>
							</div>
						</div>
					</div>
					{publisherList && <PublisherTable publisherList={publisherList} />}
				</CardContent>

				<CardFooter className="flex items-center justify-center">
					{publisherList && (
						<Pagination
							totalCount={publisherList.count}
							limit={publisher.params.limit}
							offset={publisher.params.offset ?? 0}
							onOffsetChange={publisher.setOffset}
						/>
					)}
				</CardFooter>
			</Card>
		</main>
	);
};

export default DashboardBookPage;
