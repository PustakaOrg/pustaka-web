import { useQuery } from "@tanstack/react-query";
import { getBatch } from "../api/getBatch";

const useBatchDetail = (id: string) => {
	const {
		data: batchDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["batch", id],
		queryFn: () => getBatch(id),
	});

	return {
		batchDetail,
		isPending,
		isError,
		error,
	};
};

export default useBatchDetail;
