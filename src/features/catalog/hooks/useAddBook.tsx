import { useMutation } from "@tanstack/react-query";
import { postBook } from "../api/postBook";

const useAddBook = () => {
	const {
		data: newBook,
		isPending,
		isError,
		error,
		mutate: addBook,
	} = useMutation({
		mutationKey: ["add-book"],
		mutationFn: (data: FormData) => postBook(data),
	});
	return {
    newBook,
    isPending,
    isError,
    error,
    addBook
  }
};

export default useAddBook;
