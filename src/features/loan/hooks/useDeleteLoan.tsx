import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLoan as deleteLoanApi } from "../api/deleteLoan";

const useDeleteLoan = () => {
	const {
		isPending,
		isError,
		error,
		mutate: deleteLoan,
	} = useMutation({
		mutationKey: ["delete-loan"],
		mutationFn: (loanId: string) => deleteLoanApi(loanId),
	});
	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["loans"] });
	return {
		isPending,
		isError,
		error,
		deleteLoan,
	};
};

export default useDeleteLoan;
