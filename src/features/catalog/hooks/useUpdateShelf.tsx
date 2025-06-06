import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchShelf, PatchShelfPayload } from "../api/patchShelf";

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
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
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
