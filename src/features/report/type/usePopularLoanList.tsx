import { useQuery } from "@tanstack/react-query";
import { getPopularLoans, PopularLoanListParams } from "../api/getLoans";

const usePopularLoanList = (params?: PopularLoanListParams) => {
	const {
		data: popularLoanList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["loans", params],
		queryFn: () => getPopularLoans(params),
	});
	return {
		popularLoanList,
		isPending,
		isError,
		error,
	};
};

export default usePopularLoanList;
