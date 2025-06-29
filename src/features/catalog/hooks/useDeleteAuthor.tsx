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
		mutationKey: ["delete-author"],
		mutationFn: (id: string) => deleteAuthorApi(id),
		onSuccess: () => {
		},
		onSettled: () => {
      toast.success("Author berhasil dihapus!");
			queryClient.invalidateQueries({ queryKey: ["authors"] });
			queryClient.invalidateQueries({ queryKey: ["all-author"] });

			queryClient.refetchQueries({ queryKey: ["books"] });
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
