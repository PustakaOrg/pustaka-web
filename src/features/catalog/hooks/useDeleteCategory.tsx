import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletCategory as deleteCategoryApi } from "../api/deleteCategory";

const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteCategory,
	} = useMutation({
		mutationKey: ["update-category"],
		mutationFn: (id: string) => deleteCategoryApi(id),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["all-category"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteCategory,
	};
};

export default useDeleteCategory;
