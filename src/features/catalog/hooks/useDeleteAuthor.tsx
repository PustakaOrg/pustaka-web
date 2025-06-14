import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAuthor as deleteAuthorApi } from "../api/deleteAuthor";
import { toast } from "sonner";

const useDeleteAuthor = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteAuthor,
	} = useMutation({
		mutationKey: ["update-author"],
		mutationFn: (id: string) => deleteAuthorApi(id),
		onSuccess: () => {
			toast.success("Author deleted successfully!");
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["authors"] });
			queryClient.invalidateQueries({ queryKey: ["all-author"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteAuthor,
	};
};

export default useDeleteAuthor;
