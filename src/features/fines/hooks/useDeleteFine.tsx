import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFine as deleteFineApi } from "../api/deleteFine";
import { toast } from "sonner";

const useDeleteFine = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteFine,
	} = useMutation({
		mutationKey: ["delete-fine"],
		mutationFn: (id: string) => deleteFineApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Denda Berhasil didelete!");
			queryClient.invalidateQueries({ queryKey: ["fines"] });

		},
	});
	return {
		isPending,
		isError,
		error,
		deleteFine,
	};
};

export default useDeleteFine;
