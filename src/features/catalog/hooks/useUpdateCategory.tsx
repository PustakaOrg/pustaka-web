import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCategory, PatchCategoryPayload } from "../api/patchCategory";

const useUpdateCategory = () => {
	const queryClient = useQueryClient();
	const {
		data: newCategory,
		isPending,
		isError,
		error,
		mutate: updateCategory,
	} = useMutation({
		mutationKey: ["update-category"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchCategoryPayload }) =>
			patchCategory(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["all-category"] });
		},
	});
	return {
		newCategory,
		isPending,
		isError,
		error,
		updateCategory,
	};
};

export default useUpdateCategory;
