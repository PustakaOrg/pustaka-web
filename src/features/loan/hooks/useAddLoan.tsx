import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLoan, PostLoanPayload } from "../api/postLoan";

const useAddLoan = () => {
	const queryClient = useQueryClient();
	const {
		data: newLoan,
		isPending,
		isError,
		error,
		mutate: addLoan,
	} = useMutation({
		mutationKey: ["add-loan"],
		mutationFn: (data: PostLoanPayload) => postLoan(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});

	return {
		newBook: newLoan,
		isPending,
		isError,
		error,
		addLoan,
	};
};

export default useAddLoan;
