import { useQuery } from "@tanstack/react-query";
import { getDashboardHomeLibrarian } from "../api/getDashboardHome";

const useDashboardHomeLibrarianData = () => {
	const { data, isPending, isError, error } = useQuery({
		queryKey: ["home-librarian"],
		queryFn: getDashboardHomeLibrarian,
	});
	return { data, isPending, isError, error };
};

export default useDashboardHomeLibrarianData;
