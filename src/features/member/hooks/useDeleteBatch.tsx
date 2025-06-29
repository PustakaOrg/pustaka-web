import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBatch as deleteBatchApi } from "../api/deleteBatch";
import { toast } from "sonner";

const useDeleteBatch = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteBatch,
	} = useMutation({
		mutationKey: ["delete-batch"],
		mutationFn: (id: string) => deleteBatchApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Angkatan Berhasil didelete!");
			queryClient.invalidateQueries({ queryKey: ["batches"] });
			queryClient.invalidateQueries({ queryKey: ["search-batch"] });

			queryClient.refetchQueries({ queryKey: ["member"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteBatch,
	};
};

export default useDeleteBatch;
