import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMember } from "../api/postMember";

const useAddMember = () => {
	const {
		data: newMember,
		isPending,
		isError,
		error,
		mutate: addMember,
	} = useMutation({
		mutationKey: ["add-book"],
		mutationFn: (data: FormData) => postMember(data),
	});

	const queryClient = useQueryClient();
	queryClient.invalidateQueries({ queryKey: ["members"] });
	return {
		newMember,
		isPending,
		isError,
		error,
		addMember,
	};
};

export default useAddMember;
