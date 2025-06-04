import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory as deleteCategoryApi } from '../api/deleteCategory';

const useDeleteCategory = () => {
    const queryClient = useQueryClient();
    const {
        isPending,
        isError,
        error,
        mutate: deleteCategory
    } = useMutation({
        mutationKey: ["delete-category"],
        mutationFn: (categoryId: string) => deleteCategoryApi(categoryId),
        onSettled() {
            queryClient.refetchQueries({ queryKey: ["categories"] });
        },
        
    })
  return (
    {
        isPending,
        isError,
        error,
        deleteCategory
    })
}

export default useDeleteCategory