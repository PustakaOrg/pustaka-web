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
import BooksTable from "~/features/catalog/components/BooksTable";

const DashboardBookPage = () => {
	const [searchParams] = useSearchParams();

	const { bookList, isPending } = useBookList(
		defaultParams<BookListParams>({
			q: searchParams.get("q") ?? undefined,
			available: searchParams.has("available") ? "true" : undefined,
			category: searchParams.getAll("category"),
		}),
	);

	return (
		<main className="flex flex-1 flex-col gap-6 p-6 overflow-scroll ">
			<ContentHeader
				title="Books"
				subtitle="Manage your library's book collection."
			/>

			<Card>
				<CardHeader className="">
					<CardTitle>Book Catalog</CardTitle>
					<CardDescription>
						{bookList?.results.length} books found
					</CardDescription>
				</CardHeader>
				<CardContent className="">
					{bookList && <BooksTable bookList={bookList} />}
				</CardContent>
			</Card>
		</main>
	);
};

export default DashboardBookPage;
