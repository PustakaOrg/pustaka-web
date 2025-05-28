import { useQuery } from "@tanstack/react-query";
import { getMember } from "../api/getMember";

const useMemberDetail = (id: string) => {
	const {
		data: memberDetail,
		isPending,
		isError,
		error,
	} = useQuery({ queryKey: ["member", id], queryFn: () => getMember(id) });
	return {
		memberDetail,
		isPending,
		isError,
		error,
	};
};

export default useMemberDetail;
