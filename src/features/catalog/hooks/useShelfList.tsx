import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getShelfList, GetShelfListParams } from "../api/getShelfList";

const useShelfList = (params?: GetShelfListParams) => {
	const {
		data: shelfList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["shelves", params],
		queryFn: () => getShelfList(params),
	});
	return {
		shelfList,
		isPending,
		isError,
		error,
	};
};

export default useShelfList;
