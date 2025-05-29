import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLibrarian, PostLibrarianPayload } from "../api/postLibrarian";

const useAddLibrarian = () => {
	const queryClient = useQueryClient();
	const {
		data: newLibrarian,
		isPending,
		isError,
		error,
    mutate: addLibrarian
	} = useMutation({
		mutationKey: ["add-loan"],
		mutationFn: (data: PostLibrarianPayload) => postLibrarian(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["librarians"] });
		},
	});
	return {
		newLibrarian,
		isPending,
		isError,
		error,
    addLibrarian
	};
};

export default useAddLibrarian;
