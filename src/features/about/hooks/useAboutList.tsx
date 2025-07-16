import { useQuery } from "@tanstack/react-query";
import { getAboutList } from "../api/getAboutList";

const useAboutList = () => {
	const {
		data: aboutList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryFn: getAboutList,
		queryKey: ["about"],
	});

	return {
		aboutList,
		isPending,
		isError,
		error,
	};
};
export default useAboutList;


