import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchAbout, PatchAboutPayload } from "../api/patchAbout";

const useUpdateAbout = () => {
	const queryClient = useQueryClient();
	const {
		data,
		isPending,
		isError,
		error,
		mutate: updateAbout,
	} = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: PatchAboutPayload }) =>
			patchAbout(id, payload),
		mutationKey: ["update-about"],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["about"] });
		},
	});
	return {
		data,
		isPending,
		isError,
		error,
		updateAbout,
	};
};

export default useUpdateAbout;
