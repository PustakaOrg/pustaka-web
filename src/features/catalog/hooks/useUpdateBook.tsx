import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBook } from "../api/patchBook";

const useUpdateBook = () => {
	const {
		data: updatedBook,
		isPending,
		isError,
		error,
		mutate: updateBook,
	} = useMutation({
		mutationKey: ["update-book"],
		mutationFn: ({ bookId, data }: { bookId: string; data: FormData }) =>
			patchBook(bookId, data),
		onSuccess: () => {
			const queryClient = useQueryClient();
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});

	return {
		newBook: updatedBook,
		isPending,
		isError,
		error,
		updateBook,
	};
};

export default useUpdateBook;
