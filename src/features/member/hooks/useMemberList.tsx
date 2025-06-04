import { useQuery } from "@tanstack/react-query";
import { getMembers, MemberListParams } from "../api/getMembers";

const useMemberList = (params?: MemberListParams) => {
	const {
		data: memberList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["members", params],
		queryFn: () =>getMembers(params),
	});
	return { memberList, isPending, isError, error };
};

export default useMemberList;
