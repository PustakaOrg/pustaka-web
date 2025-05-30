import React from "react";
import { FinesListParams, getFines } from "../api/getFines";
import { useQuery } from "@tanstack/react-query";

const useFineList = (params?: FinesListParams) => {
	const {
		data: fineList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["fines", params],
		queryFn: () => getFines(params),
	});

	return { fineList, isPending, isError, error };
};

export default useFineList;
