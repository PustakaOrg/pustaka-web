import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getClassList, GetClassListParams } from "../api/getClassList";

const useClassList = (params?: GetClassListParams) => {
	const {
		data: classList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["classes", params],
		queryFn: () => getClassList(params),
	});
	return {
		data: classList,
		isPending,
		isError,
		error,
	};
};

export default useClassList;
