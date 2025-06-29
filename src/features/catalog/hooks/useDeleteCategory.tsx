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
		mutationKey: ["delete-category"],
		mutationFn: (id: string) => deleteCategoryApi(id),
		onSuccess: () => {
		},
		onSettled: () => {
      toast.success("Kategori berhasil dihapus!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["all-category"] });

			queryClient.refetchQueries({ queryKey: ["books"] });
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
