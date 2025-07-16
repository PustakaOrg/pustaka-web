import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAbout as deleteAboutApi } from "../api/deleteAbout";

const useDeleteAbout = () => {
	const queryClient = useQueryClient();
	const {
		data,
		isPending,
		isError,
		error,
		mutate: deleteAbout,
	} = useMutation({
		mutationFn: (id: string) => deleteAboutApi(id),
		mutationKey: ["delete-about"],
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["about"] });
		},
	});
	return {
		data,
		isPending,
		isError,
		error,
		deleteAbout,
	};
};

export default useDeleteAbout;

