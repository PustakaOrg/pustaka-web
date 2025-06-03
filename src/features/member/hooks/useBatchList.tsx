import { useQuery } from "@tanstack/react-query";
import { getBatchList, GetBatchListParams } from "../api/getBatchList";

const useBatchList = (params?: GetBatchListParams) => {
	const {
		data: batchList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["batches", params],
		queryFn: () => getBatchList(params),
	});
	return {
		batchList,
		isPending,
		isError,
		error,
	};
};

export default useBatchList;
