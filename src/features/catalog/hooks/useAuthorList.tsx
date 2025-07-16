import { useQuery } from "@tanstack/react-query";
import { getAuthorList, GetAuthorListParams } from "../api/getAuthorList";

const useAuthorList = (params?: GetAuthorListParams) => {
	const {
		data: authorList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["authors", params],
		queryFn: () => getAuthorList(params),
	});
	return {
		authorList,
		isPending,
		isError,
		error,
	};
};

export default useAuthorList;
