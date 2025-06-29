import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchCategory, PatchCategoryPayload } from "../api/patchCategory";
import { toast } from "sonner";

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
			toast.success("Kategori berhasil diupdate!");
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["all-category"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
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
