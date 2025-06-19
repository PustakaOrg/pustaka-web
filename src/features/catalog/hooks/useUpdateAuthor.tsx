import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchAuthor, PatchAuthorPayload } from "../api/patchAuthor";
import { toast } from "sonner";

const useUpdateAuthor = () => {
	const queryClient = useQueryClient();
	const {
		data: newAuthor,
		isPending,
		isError,
		error,
		mutate: updateAuthor,
	} = useMutation({
		mutationKey: ["update-author"],
		mutationFn: ({ id, payload }: { id: string; payload: PatchAuthorPayload }) =>
			patchAuthor(id, payload),
		onSuccess: () => {
			toast.success("Author updated successfully!");
			queryClient.invalidateQueries({ queryKey: ["authors"] });
			queryClient.invalidateQueries({ queryKey: ["all-author"] });
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});
	return {
		newAuthor,
		isPending,
		isError,
		error,
		updateAuthor,
	};
};

export default useUpdateAuthor;
