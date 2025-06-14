import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBook as deleteBookApi } from "../api/deleteBook";
import { toast } from "sonner";

const useDeleteBook = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteBook,
	} = useMutation({
		mutationKey: ["delete-book"],
		mutationFn: (bookId: string) => deleteBookApi(bookId),
		onSuccess: () => {
			toast.success("Book deleted successfully!");
		},
		onSettled() {
			queryClient.refetchQueries({ queryKey: ["books"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteBook,
	};
};

export default useDeleteBook;
