import { useQuery } from "@tanstack/react-query";
import { getWAStatus } from "../api/getWAStatus";

const useWAStatus = () => {
	const {
		data: waStatus,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["wa-status"],
		queryFn: () => getWAStatus(),
		refetchInterval: 3000,
	});

	return { waStatus, isPending, isError, error };
};

export default useWAStatus;
