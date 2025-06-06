import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import BookCardList from "~/features/catalog/components/BookCardList";
import SearchBar from "~/features/catalog/components/SearchBar";
import SideFilter from "~/features/catalog/components/SideFilter";
import useBookList from "~/features/catalog/hooks/useBookList";
import { BookListParams } from "~/features/catalog/types/BookListParams";
import { Pagination } from "~/shared/components/Pagination";
import { defaultParams } from "~/shared/utils/functions";

const CatalogPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const bookListParams = {
		q: searchParams.get("q") ?? undefined,
		available: searchParams.has("available") ? "true" : undefined,
		category: searchParams.getAll("category"),
		limit: searchParams.get("limit") ? Number(searchParams.get("limit")) : 8,
		offset: searchParams.get("offset")
			? Number(searchParams.get("offset"))
			: undefined,
	};

	const { bookList, isPending } = useBookList(
		defaultParams<BookListParams>(bookListParams),
	);

	const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const q = formData.get("q");

		setSearchParams((prev) => {
			prev.set("q", String(q));
			return prev;
		});
	}, []);

	const handleOffsetChange = useCallback((newOffset: number) => {
		setSearchParams((prev) => {
			prev.set("offset", String(newOffset));

			return prev;
		});
	}, []);

	const handleFilterApply = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const available = formData.has("available");
		const categories = formData.getAll("category");

		setSearchParams((prev) => {
			if (available) prev.set("available", String(available));
			else prev.delete("available");

			while (prev.has("category")) {
				prev.delete("category");
			}
			for (const category of categories) {
				prev.append("category", category as string);
			}

			return prev;
		});
	};

	return (
		<main className="flex">
			<div className="px-4 py-6 md:px-6 grow ">
				<div className="mb-6">
					<h1 className="text-3xl font-bold tracking-tight">Katalog Buku</h1>
					<p className="text-muted-foreground">
						Cari koleksi buku yang ada diperpustakaan.
					</p>
				</div>
				<SearchBar
					onSearchSubmit={handleSearchSubmit}
					initialQuery={bookListParams.q ?? ""}
				/>

				<div className="flex gap-6 relative">
					<section className="hidden lg:block min-w-[200px] relative">
						<div className="sticky top-20">
							<SideFilter onFilterApply={handleFilterApply} />
						</div>
					</section>

					<div className="grow">
						<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{isPending && <p>Loading...</p>}
							{bookList && bookList.count === 0 && (
								<p className="col-span-full text-center">
									No Books Found find Another One
								</p>
							)}
							{bookList && !isPending && bookList.results.length > 0 && (
								<BookCardList books={bookList.results} />
							)}
						</section>

						{bookList && (
							<section className="mt-8 flex items-center justify-center space-x-2">
								<Pagination
									totalCount={bookList.count}
									limit={bookListParams.limit}
									offset={bookListParams.offset ?? 0}
									onOffsetChange={handleOffsetChange}
								/>
							</section>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default CatalogPage;
