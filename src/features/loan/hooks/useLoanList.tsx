import { useQuery } from "@tanstack/react-query";
import { getLoans, LoanListParams } from "../api/getLoans";

const useLoanList = (params?: LoanListParams) => {
	const {
		data: loanList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["loans", params],
		queryFn: () => getLoans(params),
	});
	return {
		loanList,
		isPending,
		isError,
		error,
	};
};

export default useLoanList;
