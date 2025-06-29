import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postClass, PostClassPayload } from "../api/postClass";
import { toast } from "sonner";

const useAddClass = () => {
	const queryClient = useQueryClient();
	const {
		data: newClass,
		isPending,
		isError,
		error,
		mutate: addClass,
	} = useMutation({
		mutationKey: ["add-class"],
		mutationFn: (payload: PostClassPayload) => postClass(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["classes"] });
			queryClient.invalidateQueries({ queryKey: ["search-class"] });

			toast.success("Kelas Berhasil ditambah!");
		},
	});
	return {
		newClass,
		isPending,
		isError,
		error,
		addClass,
	};
};

export default useAddClass;
