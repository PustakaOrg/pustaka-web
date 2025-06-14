import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCategory, PostCategoryPayload } from "../api/postCategory";
import { toast } from "sonner";

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
			toast.success("Category added successfully!");
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
