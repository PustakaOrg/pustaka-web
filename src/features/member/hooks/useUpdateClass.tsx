import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchClass, PatchClassPayload } from "../api/patchClass";

const useUpdateClass = () => {
	const queryClient = useQueryClient();
	const {
		data: newClass,
		isPending,
		isError,
		error,
		mutate: updateClass,
	} = useMutation({
		mutationKey: ["update-class"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchClassPayload }) =>
			patchClass(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classes", "class"] });
		},
	});
	return {
		newClass,
		isPending,
		isError,
		error,
		updateClass,
	};
};

export default useUpdateClass;
