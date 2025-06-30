import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postLibrarian, PostLibrarianPayload } from "../api/postLibrarian";
import { toast } from "sonner";

const useAddLibrarian = () => {
	const queryClient = useQueryClient();
	const {
		data: newLibrarian,
		isPending,
		isError,
		error,
		mutate: addLibrarian,
	} = useMutation({
		mutationKey: ["add-librarian"],
		mutationFn: (data: PostLibrarianPayload) => postLibrarian(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["librarians"] });
			toast.success("Pustakawan Berhasil ditamabah!!");
		},
	});
	return {
		newLibrarian,
		isPending,
		isError,
		error,
		addLibrarian,
	};
};

export default useAddLibrarian;
