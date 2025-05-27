import { useQuery } from "@tanstack/react-query";
import { allShelf } from "../api/allShelf";

const useAllShelf = () => {
	const {
		data: shelf,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["all-shelf"],
		queryFn: allShelf,
		staleTime: Infinity,
	});
	return {
		shelf,
		isPending,
		isError,
		error,
	};
};

export default useAllShelf;
