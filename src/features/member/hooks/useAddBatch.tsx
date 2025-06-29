import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PatchBatchPayload } from "../api/patchBatch";
import { postBatch } from "../api/postBatch";
import { toast } from "sonner";

const useAddBatch = () => {
	const queryClient = useQueryClient();
	const {
		data: newBatch,
		isPending,
		isError,
		error,
		mutate: addBatch,
	} = useMutation({
		mutationKey: ["add-batch"],
		mutationFn: (payload: PatchBatchPayload) => postBatch(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["batches"] });
			queryClient.invalidateQueries({ queryKey: ["search-batch"] });

			toast.success("Angkatan Berhasil ditambah!");
		},
	});
	return {
		newBatch,
		isPending,
		isError,
		error,
		addBatch,
	};
};

export default useAddBatch;
