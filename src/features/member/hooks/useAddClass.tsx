import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postClass, PostClassPayload } from "../api/postClass";

const useAddClass = () => {
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
			queryClient.invalidateQueries({ queryKey: ["classes"] });
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

export default useAddClass;
