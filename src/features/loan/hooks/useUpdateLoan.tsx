import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLoan } from "../api/patchLoan";

const useUpdateLoan = () => {
	const {
		data: updatedLoan,
		isPending,
		isError,
		error,
		mutate: updateLoan,
	} = useMutation({
		mutationKey: ["update-loan"],
		mutationFn: ({ loanId, data }: { loanId: string; data: FormData }) =>
			patchLoan(loanId, data),
	});

	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["loans"] });
	queryClient.invalidateQueries({ queryKey: ["books"] });
	return {
		newBook: updatedLoan,
		isPending,
		isError,
		error,
		addBook: updateLoan,
	};
};

export default useUpdateLoan;
