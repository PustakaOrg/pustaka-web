import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { importMember as importMemberAPI } from "../api/importMember";

const useImportMember = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: importMember,
	} = useMutation({
		mutationKey: ["import-book"],
		mutationFn: (form: FormData) => importMemberAPI(form),
		onSuccess: (data) => {
			toast.success(
				`Berhasil import ${data.created} data, data yang di skip ${data.skipped}`,
			);
			queryClient.invalidateQueries({ queryKey: ["members"] });
			queryClient.invalidateQueries({ queryKey: ["search-member"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		importMember,
	};
};

export default useImportMember;
