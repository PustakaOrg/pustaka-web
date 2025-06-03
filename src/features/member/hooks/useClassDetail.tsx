import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getClass } from "../api/getClass";

const useClassDetail = (id: string) => {
	const {
		data: classDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["class", id],
		queryFn: () => getClass(id),
	});

	return {
		classDetail,
		isPending,
		isError,
		error,
	};
};

export default useClassDetail;
