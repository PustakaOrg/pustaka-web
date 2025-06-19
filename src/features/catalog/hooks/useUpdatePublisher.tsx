import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchPublisher, PatchPublisherPayload } from "../api/patchPublisher";
import { toast } from "sonner";

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
			toast.success("Publisher updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
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
