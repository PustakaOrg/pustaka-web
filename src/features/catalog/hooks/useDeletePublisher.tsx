import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletPublisher as deletePublisherApi } from "../api/deletePublisher";

const useDeletePublisher = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deletePublisher,
	} = useMutation({
		mutationKey: ["update-publisher"],
		mutationFn: (id: string) => deletePublisherApi(id),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
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
