import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletCategory as deleteCategoryApi } from "../api/deleteCategory";
import { toast } from "sonner";

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
		onSuccess: () => {
			toast.success("Category deleted successfully!");
		},
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
