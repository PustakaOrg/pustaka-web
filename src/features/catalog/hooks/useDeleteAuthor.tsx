import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletAuthor as deleteAuthorApi } from "../api/deleteAuthor";

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
