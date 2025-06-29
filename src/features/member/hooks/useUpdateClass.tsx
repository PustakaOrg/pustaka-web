import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchClass, PatchClassPayload } from "../api/patchClass";
import { toast } from "sonner";

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
			queryClient.invalidateQueries({ queryKey: ["classes"] });
			queryClient.invalidateQueries({ queryKey: ["search-class"] });

			toast.success("Kelas berhasil diupdate!");
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
