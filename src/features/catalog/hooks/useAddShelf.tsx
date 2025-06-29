import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postShelf, PostShelfPayload } from "../api/postShelf";
import { toast } from "sonner";

const useAddShelf = () => {
	const queryClient = useQueryClient();
	const {
		data: newShelf,
		isPending,
		isError,
		error,
		mutate: addShelf,
	} = useMutation({
		mutationKey: ["add-shelf"],
		mutationFn: (payload: PostShelfPayload) => postShelf(payload),
		onSuccess: () => {
			toast.success("Rak berhasil ditambahkan!");
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["search-shelf"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
		},
	});
	return {
		newShelf,
		isPending,
		isError,
		error,
		addShelf,
	};
};

export default useAddShelf;
