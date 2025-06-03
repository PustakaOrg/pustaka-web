import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBatch, PatchBatchPayload } from "../api/patchBatch";

const useUpdateClass = () => {
	const queryClient = useQueryClient();
	const {
		data: newBatch,
		isPending,
		isError,
		error,
		mutate: updateBatch,
	} = useMutation({
		mutationKey: ["update-batch"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchBatchPayload }) =>
			patchBatch(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["batches", "batch"] });
		},
	});
	return {
		newBatch,
		isPending,
		isError,
		error,
		updateBatch,
	};
};

export default useUpdateClass;
