import { useQuery } from "@tanstack/react-query";
import { allCategory } from "../api/allCategory";

const useAllCategory = () => {
	const {
		data: categories,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["all-categories"],
		queryFn: allCategory,
		staleTime: Infinity,
	});
	return {
		categories,
		isPending,
		isError,
		error,
	};
};

export default useAllCategory;
