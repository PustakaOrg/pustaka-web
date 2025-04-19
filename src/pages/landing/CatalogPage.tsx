import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";
import { useSearchParams } from "react-router";
import BookCardList from "~/features/catalog/components/BookCardList";
import SearchBar from "~/features/catalog/components/SearchBar";
import SideFilter from "~/features/catalog/components/SideFilter";
import useBookList from "~/features/catalog/hooks/useBookList";
import { BookListParams } from "~/features/catalog/types/BookListParams";

const defaultBookListParams = (bookParam: BookListParams) => {
	return Object.fromEntries(
		Object.entries(bookParam).filter(
			([_, value]) =>
				value !== undefined && !(Array.isArray(value) && value.length === 0),
		),
	) as BookListParams;
};

const CatalogPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const { bookList, isPending } = useBookList(
		defaultBookListParams({
			q: searchParams.get("q") ?? undefined,
			available: searchParams.has("available") ? "true" : undefined,
			category: searchParams.getAll("category"),
		}),
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

	const handleFilterApply = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const available = formData.has("available");
		const published_year = formData.get("published_year[]");
		formData.delete("available");
		formData.delete("published_year[]");
		const categories = formData.keys();

		setSearchParams((prev) => {
			prev.set("available", String(available));
			// prev.set("publish_year", String(published_year));
			while (prev.has("category")) {
				prev.delete("category");
			}
			for (const category of categories) {
				prev.append("category", category);
			}

			return prev;
		});
	}, []);

	return (
		<main className="flex" >
			<div className="px-4 py-6 md:px-6 grow ">
				<SearchBar onSearchSubmit={handleSearchSubmit} />

				<div className="flex gap-6">
					<section className="hidden lg:block lg:basis-1/4">
						<SideFilter onFilterApply={handleFilterApply} />
					</section>

					{/* Book Grid */}
					<div className="grow">
						<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{isPending && <p>Loading...</p>}
              {bookList && bookList.count === 0 && <p className="col-span-full text-center">No Books Found find Another One</p>}
							{bookList && !isPending && (
								<BookCardList books={bookList.results} />
							)}
						</section>

						{/* Pagination */}
						{/* <section className="mt-8 flex items-center justify-center space-x-2"> */}
						{/* 	<Button variant="outline" size="icon"> */}
						{/* 		<ChevronLeft className="h-4 w-4" /> */}
						{/* 		<span className="sr-only">Previous page</span> */}
						{/* 	</Button> */}
						{/* 	{[1, 2, 3, 4, 5].map((page) => ( */}
						{/* 		<Button */}
						{/* 			key={page} */}
						{/* 			variant={page === 1 ? "default" : "outline"} */}
						{/* 			size="icon" */}
						{/* 			className="h-8 w-8" */}
						{/* 		> */}
						{/* 			{page} */}
						{/* 		</Button> */}
						{/* 	))} */}
						{/* 	<Button variant="outline" size="icon"> */}
						{/* 		<ChevronRight className="h-4 w-4" /> */}
						{/* 		<span className="sr-only">Next page</span> */}
						{/* 	</Button> */}
						{/* </section> */}
					</div>
				</div>
			</div>
		</main>
	);
};

export default CatalogPage;
