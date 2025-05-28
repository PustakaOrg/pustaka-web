import { useQuery } from "@tanstack/react-query";
import { BookListParams } from "../types/BookListParams";
import { getBooks } from "../api/getBooks";

const useSearchBook = (q: string) => {
	const {
		data: bookList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["search-books", q],
		queryFn: () => getBooks({ q } as BookListParams),
	});
	return { bookList, isPending, isError, error };
};

export default useSearchBook;
