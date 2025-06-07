import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPublisherList, GetPublisherListParams } from "../api/getPublisherList";

const usePublisherList = (params?: GetPublisherListParams) => {
	const {
		data: publisherList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["publishers", params],
		queryFn: () => getPublisherList(params),
	});
	return {
		publisherList,
		isPending,
		isError,
		error,
	};
};

export default usePublisherList;
