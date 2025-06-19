import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLoan, PostLoanPayload } from "../api/postLoan";
import { toast } from "sonner";

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
      toast.success("Peminjaman berhasil ditambah!")
		},
	});

	return {
		newLoan,
		isPending,
		isError,
		error,
		addLoan,
	};
};

export default useAddLoan;
