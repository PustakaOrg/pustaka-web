import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/getMembers";

const useSearchMember = (q: string) => {
	const {
		data: memberList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["search-members", q],
		queryFn: () => getMembers({ q, limit: 9999 }),
	});
	return { memberList, isPending, isError, error };
};

export default useSearchMember;
