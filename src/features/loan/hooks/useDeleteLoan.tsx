import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLoan as deleteLoanApi } from "../api/deleteLoan";
import { toast } from "sonner";

const useDeleteLoan = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteLoan,
	} = useMutation({
		mutationKey: ["delete-loan"],
		mutationFn: (id: string) => deleteLoanApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Peminjaman behasil dihapus!");
			queryClient.invalidateQueries({ queryKey: ["loans"] });

		},
	});
	return {
		isPending,
		isError,
		error,
		deleteLoan,
	};
};

export default useDeleteLoan;
