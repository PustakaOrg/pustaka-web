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
		mutationKey: ["update-shelf"],
		mutationFn: (id: string) => deleteShelfApi(id),
		onSuccess: () => {
			toast.success("Shelf deleted successfully!");	
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
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
