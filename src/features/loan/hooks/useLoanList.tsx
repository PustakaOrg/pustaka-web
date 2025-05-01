import { useQuery } from "@tanstack/react-query";
import { getLoans } from "../api/getLoans";

const useLoanList = () => {
	const {
		data: loanList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["loans"],
		queryFn: getLoans,
	});
	return {
		loanList,
		isPending,
		isError,
		error,
	};
};

export default useLoanList;
