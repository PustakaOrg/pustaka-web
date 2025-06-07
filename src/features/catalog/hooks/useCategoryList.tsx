import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getCategoryList, GetCategoryListParams } from "../api/getCategoryList";

const useCategoryList = (params?: GetCategoryListParams) => {
	const {
		data: categoryList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["categories", params],
		queryFn: () => getCategoryList(params),
	});
	return {
		categoryList,
		isPending,
		isError,
		error,
	};
};

export default useCategoryList;
