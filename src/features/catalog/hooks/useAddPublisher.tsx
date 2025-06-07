import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postPublisher, PostPublisherPayload } from "../api/postPublisher";

const useAddPublisher = () => {
	const queryClient = useQueryClient();
	const {
		data: newPublisher,
		isPending,
		isError,
		error,
		mutate: addPublisher,
	} = useMutation({
		mutationKey: ["add-publisher"],
		mutationFn: (payload: PostPublisherPayload) => postPublisher(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["search-publisher"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
		},
	});
	return {
		newPublisher,
		isPending,
		isError,
		error,
		addPublisher,
	};
};

export default useAddPublisher;
