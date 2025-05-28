import { useQuery } from "@tanstack/react-query";
import { getBook } from "../api/getBook";

const useBookDetail = (id: string) => {
	const {
		data: bookDetail,
		isPending,
		isError,
		error,
	} = useQuery({ queryKey: ["book", id], queryFn: () => getBook(id) });
	return {
		bookDetail,
		isPending,
		isError,
		error,
	};
};

export default useBookDetail;
