import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getShelf } from "../api/getShelf";

const useShelfDetail = (id: string) => {
	const {
		data: classDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["shelf", id],
		queryFn: () => getShelf(id),
	});

	return {
		classDetail,
		isPending,
		isError,
		error,
	};
};

export default useShelfDetail;
