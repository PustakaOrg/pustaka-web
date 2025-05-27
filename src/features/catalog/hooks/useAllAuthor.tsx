import { useQuery } from "@tanstack/react-query";
import { allAuthor } from "../api/allAuthor";

const useAllAuthor = () => {
	const {
		data: author,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["all-author"],
		queryFn: allAuthor,
		staleTime: Infinity,
	});
	return {
		author,
		isPending,
		isError,
		error,
	};
};

export default useAllAuthor;
