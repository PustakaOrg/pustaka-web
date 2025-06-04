import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postCategory } from '../api/postCategory';

const useAddCategory = () => {
  const {
		data: newCategory,
		isPending,
		isError,
		error,
		mutate: addCategory,
	} = useMutation({
		mutationKey: ["add-category"],
		mutationFn: (data: FormData) => postCategory(data),
	});

	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["categories"] });
	return {
		newCategory,
		isPending,
		isError,
		error,
		addCategory,
	};
};

export default useAddCategory