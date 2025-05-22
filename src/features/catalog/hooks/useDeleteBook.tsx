import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook as deleteBookApi } from "../api/deleteBook";

const useDeleteBook = () => {
	const {
		isPending,
		isError,
		error,
		mutate: deleteBook,
	} = useMutation({
		mutationKey: ["delete-book"],
		mutationFn: (bookId: string) => deleteBookApi(bookId),
	});
	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["books"] });
	return {
		// newBook,
		isPending,
		isError,
		error,
		deleteBook,
	};
};

export default useDeleteBook;
