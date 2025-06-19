import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchShelf, PatchShelfPayload } from "../api/patchShelf";
import { toast } from "sonner";

const useUpdateShelf = () => {
	const queryClient = useQueryClient();
	const {
		data: newShelf,
		isPending,
		isError,
		error,
		mutate: updateShelf,
	} = useMutation({
		mutationKey: ["update-shelf"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchShelfPayload }) =>
			patchShelf(id, payload),
		onSuccess: () => {
			toast.success("Shelf updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});
	return {
		newShelf,
		isPending,
		isError,
		error,
		updateShelf,
	};
};

export default useUpdateShelf;
