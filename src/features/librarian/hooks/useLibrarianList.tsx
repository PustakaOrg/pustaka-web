import { useQuery } from "@tanstack/react-query";
import { getLibrarian, LibrarianListParams } from "../api/getLibrarians";

const useLibrarianList = (params?: LibrarianListParams) => {
	const {
		data: librarianList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["librarians", params],
		queryFn: () => getLibrarian(params),
	});

    return { librarianList, isPending, isError, error}
};

export default useLibrarianList;
