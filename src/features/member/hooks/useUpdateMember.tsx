import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchMember } from "../api/patchMember";

const useUpdateMember = () => {
	const queryClient = useQueryClient();
	const {
		data: updatedMember,
		isPending,
		isError,
		error,
		mutate: updateMember,
	} = useMutation({
		mutationKey: ["update-member"],
		mutationFn: ({ memberId, data }: { memberId: string; data: FormData }) =>
			patchMember(memberId, data),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["members"] });
			queryClient.refetchQueries({ queryKey: ["member"] });
			queryClient.refetchQueries({ queryKey: ["search-members"] });
			queryClient.refetchQueries({ queryKey: ["profile"] });
		},
	});

	return {
		updatedMember,
		isPending,
		isError,
		error,
		updateMember,
	};
};

export default useUpdateMember;
