import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategory, PostCategoryPayload } from "../api/postCategory";

const useAddCategory = () => {
	const queryClient = useQueryClient();
	const {
		data: newCategory,
		isPending,
		isError,
		error,
		mutate: addCategory,
	} = useMutation({
		mutationKey: ["add-category"],
		mutationFn: (payload: PostCategoryPayload) => postCategory(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["search-category"] });
			queryClient.invalidateQueries({ queryKey: ["all-category"] });
		},
	});
	return {
		newCategory,
		isPending,
		isError,
		error,
		addCategory,
	};
};

export default useAddCategory;
