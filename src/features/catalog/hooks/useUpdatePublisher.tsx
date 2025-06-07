import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPublisher, PatchPublisherPayload } from "../api/patchPublisher";

const useUpdatePublisher = () => {
	const queryClient = useQueryClient();
	const {
		data: newPublisher,
		isPending,
		isError,
		error,
		mutate: updatePublisher,
	} = useMutation({
		mutationKey: ["update-publisher"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchPublisherPayload }) =>
			patchPublisher(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
		},
	});
	return {
		newPublisher,
		isPending,
		isError,
		error,
		updatePublisher,
	};
};

export default useUpdatePublisher;
