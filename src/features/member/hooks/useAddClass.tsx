import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postClass, PostClassPayload } from "../api/postClass";

const useAddBatch = () => {
	const queryClient = useQueryClient();
	const {
		data: newClass,
		isPending,
		isError,
		error,
		mutate: addClass,
	} = useMutation({
		mutationKey: ["add-class"],
		mutationFn: (payload: PostClassPayload) => postClass(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classes", "class"] });
		},
	});
	return {
		newClass,
		isPending,
		isError,
		error,
		addClass,
	};
};

export default useAddBatch;
