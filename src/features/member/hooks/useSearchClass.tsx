import { useQuery } from "@tanstack/react-query";
import { getClassList } from "../api/getClassList";

const useSearchClass = (q: string) => {
	const {
		data: classList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["search-class", q],
		queryFn: () => getClassList({ q, limit: 999 }),
	});
	return { classList, isPending, isError, error };
};

export default useSearchClass;
