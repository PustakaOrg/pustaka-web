import { ChevronLeft, ChevronRight } from "lucide-react";
import { FormEvent, useCallback, useState } from "react";
import books from "~/features/catalog/api/booksDummy";
import BookCardList from "~/features/catalog/components/BookCardList";
import SearchBar from "~/features/catalog/components/SearchBar";
import SideFilter from "~/features/catalog/components/SideFilter";
import useBookList from "~/features/catalog/hooks/useBookList";
import { Button } from "~/shared/components/ui/button";

const CatalogPage = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [queryFilter, setQueryFilter] = useState("");

	const { bookList, isPending } = useBookList();

	const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const q = formData.get("q");
		setSearchQuery(String(q));
	}, []);

	return (
		<main className="flex-1">
			<div className="container px-4 py-6 md:px-6">
				<SearchBar onSearchSubmit={handleSearchSubmit} />

				<div className="flex gap-6">
					<section className="hidden lg:block lg:basis-1/4">
						<SideFilter />
					</section>

					{/* Book Grid */}
					<div className="grow">
						<section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{bookList && <BookCardList books={bookList.results} />}
						</section>

						{/* Pagination */}
						<section className="mt-8 flex items-center justify-center space-x-2">
							<Button variant="outline" size="icon">
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Previous page</span>
							</Button>
							{[1, 2, 3, 4, 5].map((page) => (
								<Button
									key={page}
									variant={page === 1 ? "default" : "outline"}
									size="icon"
									className="h-8 w-8"
								>
									{page}
								</Button>
							))}
							<Button variant="outline" size="icon">
								<ChevronRight className="h-4 w-4" />
								<span className="sr-only">Next page</span>
							</Button>
						</section>
					</div>
				</div>
			</div>
		</main>
	);
};

export default CatalogPage;
