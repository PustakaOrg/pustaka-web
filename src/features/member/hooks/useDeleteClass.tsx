import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClass as deleteClassApi } from "../api/deleteClass";
import { toast } from "sonner";

const useDeleteClass = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteClass,
	} = useMutation({
		mutationKey: ["delete-class"],
		mutationFn: (id: string) => deleteClassApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Kelas Berhasil didelete!");
			queryClient.invalidateQueries({ queryKey: ["classes"] });
			queryClient.invalidateQueries({ queryKey: ["search-class"] });

			queryClient.refetchQueries({ queryKey: ["member"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		deleteClass,
	};
};

export default useDeleteClass;
