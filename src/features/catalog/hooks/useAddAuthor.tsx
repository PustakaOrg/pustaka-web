import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAuthor, PostAuthorPayload } from "../api/postAuthor";

const useAddAuthor = () => {
	const queryClient = useQueryClient();
	const {
		data: newAuthor,
		isPending,
		isError,
		error,
		mutate: addAuthor,
	} = useMutation({
		mutationKey: ["add-author"],
		mutationFn: (payload: PostAuthorPayload) => postAuthor(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authors"] });
			queryClient.invalidateQueries({ queryKey: ["search-author"] });
			queryClient.invalidateQueries({ queryKey: ["all-author"] });
		},
	});
	return {
		newAuthor,
		isPending,
		isError,
		error,
		addAuthor,
	};
};

export default useAddAuthor;
