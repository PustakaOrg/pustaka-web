import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAuthor } from "../api/getAuthor";

const useAuthorDetail = (id: string) => {
	const {
		data: classDetail,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["author", id],
		queryFn: () => getAuthor(id),
	});

	return {
		classDetail,
		isPending,
		isError,
		error,
	};
};

export default useAuthorDetail;
