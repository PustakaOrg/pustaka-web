import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getPublisher } from "../api/getPublisher";

const usePublisherDetail = (id: string) => {
	const {
		data: classDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["publisher", id],
		queryFn: () => getPublisher(id),
	});

	return {
		classDetail,
		isPending,
		isError,
		error,
	};
};

export default usePublisherDetail;
