import { useQuery } from "@tanstack/react-query";
import { allPublisher } from "../api/allPublisher";

const useAllPublisher = () => {
	const {
		data: publishers,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["all-publisher"],
		queryFn: allPublisher,
		staleTime: Infinity,
	});
	return {
		publishers,
		isPending,
		isError,
		error,
	};
};

export default useAllPublisher;
