import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShelf as deleteShelfApi } from "../api/deleteShelf";
import { toast } from "sonner";

const useDeleteShelf = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteShelf,
	} = useMutation({
		mutationKey: ["delete-shelf"],
		mutationFn: (id: string) => deleteShelfApi(id),
		onSuccess: () => {
		},
		onSettled: () => {
      toast.success("Rak berhasil dihapus!");
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteShelf,
	};
};

export default useDeleteShelf;
