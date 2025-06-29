import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletPublisher as deletePublisherApi } from "../api/deletePublisher";
import { toast } from "sonner";

const useDeletePublisher = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deletePublisher,
	} = useMutation({
		mutationKey: ["delete-publisher"],
		mutationFn: (id: string) => deletePublisherApi(id),
		onSuccess: () => {
		},
		onSettled: () => {
      toast.success("Penerbit berhasil dihapus!");
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deletePublisher,
	};
};

export default useDeletePublisher;
