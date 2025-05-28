import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLoan, PatchLoanPayload } from "../api/patchLoan";

const useUpdateLoanStatus = () => {
	const queryClient = useQueryClient();
	const {
		data: updatedLoan,
		isPending,
		isError,
		error,
		mutate: updateLoan,
	} = useMutation({
		mutationKey: ["update-loan"],
		mutationFn: ({
			loanId,
			payload,
		}: { loanId: string; payload: PatchLoanPayload }) =>
			patchLoan(loanId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});

	return {
		newBook: updatedLoan,
		isPending,
		isError,
		error,
		updateLoan,
	};
};

export default useUpdateLoanStatus;
