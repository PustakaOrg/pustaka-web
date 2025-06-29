import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postMember } from "../api/postMember";
import { toast } from "sonner";

const useAddMember = () => {
  const queryClient = useQueryClient();
	const {
		data: newMember,
		isPending,
		isError,
		error,
		mutate: addMember,
	} = useMutation({
		mutationKey: ["add-member"],
		mutationFn: (data: FormData) => postMember(data),
      onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ["members"] });
      queryClient.invalidateQueries({ queryKey: ["search-member"] });

			toast.success("Member Berhasil ditambah!");
    }
	});

	return {
		newMember,
		isPending,
		isError,
		error,
		addMember,
	};
};

export default useAddMember;
