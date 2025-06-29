import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchLibrarian, PatchLibrarianPayload } from "../api/patchLibrarian";
import { toast } from "sonner";

const useUpdateLibrarian = () => {
	const queryClient = useQueryClient();
	const {
		data: newLibrarian,
		isPending,
		isError,
		error,
		mutate: updateLibrarian,
	} = useMutation({
		mutationKey: ["update-librarian"],
		mutationFn: ({ id, data }: { id: string; data: PatchLibrarianPayload }) =>
			patchLibrarian(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["librarians"] });

			toast.success("Librarian updated successfully!!");
		},
	});
	return {
		newLibrarian,
		isPending,
		isError,
		error,
		updateLibrarian,
	};
};

export default useUpdateLibrarian;
