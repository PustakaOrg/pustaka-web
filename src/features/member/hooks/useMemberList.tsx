import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/getMembers";

const useMemberList = () => {
	const {
		data: memberList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["members"],
		queryFn: getMembers,
	});
	return { memberList, isPending, isError, error };
};

export default useMemberList;
