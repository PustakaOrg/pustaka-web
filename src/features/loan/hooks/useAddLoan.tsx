import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLoan } from "../api/postLoan";

const useAddLoan = () => {
	const {
		data: newLoan,
		isPending,
		isError,
		error,
		mutate: addLoan,
	} = useMutation({
		mutationKey: ["add-loan"],
		mutationFn: (data: FormData) => postLoan(data),
	});

	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["loans"] });
	queryClient.invalidateQueries({ queryKey: ["books"] });
	return {
		newBook: newLoan,
		isPending,
		isError,
		error,
		addBook: addLoan,
	};
};

export default useAddLoan;
