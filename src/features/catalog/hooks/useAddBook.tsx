import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBook } from "../api/postBook";

const useAddBook = () => {
  const queryClient = useQueryClient();
	const {
		data: newBook,
		isPending,
		isError,
		error,
		mutate: addBook,
	} = useMutation({
		mutationKey: ["add-book"],
		mutationFn: (data: FormData) => postBook(data),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});

	return {
		newBook,
		isPending,
		isError,
		error,
		addBook,
	};
};

export default useAddBook;
