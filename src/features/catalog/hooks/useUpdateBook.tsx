import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchBook } from "../api/patchBook";

const useUpdateBook = () => {
  const queryClient = useQueryClient();
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
			queryClient.refetchQueries({ queryKey: ["books"] });
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
