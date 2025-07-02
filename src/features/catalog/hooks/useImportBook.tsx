import { useMutation } from "@tanstack/react-query";
import { importBook as importBookAPI } from "../api/importBook";
import { toast } from "sonner";
import { queryClient } from "~/shared/utils/queryClient";

const useImportBook = () => {
	const {
		isPending,
		isError,
		error,
		mutate: importBook,
	} = useMutation({
		mutationKey: ["import-book"],
		mutationFn: (form: FormData) => importBookAPI(form),
		onSuccess: (data) => {
			toast.success(
				`Berhasil import ${data.created} data, data yang di skip ${data.skipped}`,
			);

			queryClient.refetchQueries({ queryKey: ["books"] });
			queryClient.invalidateQueries({ queryKey: ["categories"] });
			queryClient.invalidateQueries({ queryKey: ["search-category"] });
			queryClient.invalidateQueries({ queryKey: ["all-categories"] });
			queryClient.invalidateQueries({ queryKey: ["publishers"] });
			queryClient.invalidateQueries({ queryKey: ["search-publisher"] });
			queryClient.invalidateQueries({ queryKey: ["all-publisher"] });
			queryClient.invalidateQueries({ queryKey: ["shelves"] });
			queryClient.invalidateQueries({ queryKey: ["search-shelf"] });
			queryClient.invalidateQueries({ queryKey: ["all-shelf"] });
			queryClient.invalidateQueries({ queryKey: ["authors"] });
			queryClient.invalidateQueries({ queryKey: ["search-author"] });
			queryClient.invalidateQueries({ queryKey: ["all-author"] });
		},
	});
	return {
		isPending,
		isError,
		error,
		importBook,
	};
};

export default useImportBook;
