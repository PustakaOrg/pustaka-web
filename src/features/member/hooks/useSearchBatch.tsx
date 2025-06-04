import { useQuery } from "@tanstack/react-query";
import { getBatchList } from "../api/getBatchList";

const useSearchBatch = (q: string) => {
	const {
		data: batchList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["search-batch", q],
		queryFn: () => getBatchList({ q, limit: 999 }),
	});
	return {batchList, isPending, isError, error };
};

export default useSearchBatch;
