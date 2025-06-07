import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategory } from "../api/getCategory";

const useCategoryDetail = (id: string) => {
	const {
		data: classDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["category", id],
		queryFn: () => getCategory(id),
	});

	return {
		classDetail,
		isPending,
		isError,
		error,
	};
};

export default useCategoryDetail;
