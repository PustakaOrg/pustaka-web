import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postAbout, PostAboutPayload } from "../api/postAbout";

const useAddAbout = () => {
	const queryClient = useQueryClient();
	const {
		data: newAbout,
		isPending,
		isError,
		error,
		mutate: addAbout,
	} = useMutation({
		mutationKey: ["add-about"],
		mutationFn: (payload: PostAboutPayload) => postAbout(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["about"] });
		},
	});

	return {
		newAbout,
		isPending,
		isError,
		error,
		addAbout,
	};
};

export default useAddAbout;


