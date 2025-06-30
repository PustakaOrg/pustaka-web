import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLibrarian as deleteLibrarianApi } from "../api/deleteLibrarian";
import { toast } from "sonner";

const useDeleteLibrarian = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteLibrarian,
	} = useMutation({
		mutationKey: ["delete-librarian"],
		mutationFn: (id: string) => deleteLibrarianApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Pustakawan Berhasil didelete!");
			queryClient.invalidateQueries({ queryKey: ["librarians"] });

		},
	});
	return {
		isPending,
		isError,
		error,
		deleteLibrarian,
	};
};

export default useDeleteLibrarian;
