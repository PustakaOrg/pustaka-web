import { useQuery } from "@tanstack/react-query";
import { getActivityLogs } from "../api/getActivityLogs";

const useActivityLogs = () => {
	const {
		data: activityLogs,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["activity-logs"],
		queryFn: () => getActivityLogs(),
		refetchInterval: 5000,
	});
	return {
		activityLogs,
		isPending,
		isError,
		error,
	};
};

export default useActivityLogs;
