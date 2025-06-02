import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getSettings } from "../api/getSettings";

const useSettings = () => {
	const {
		data: settings,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["settings"],
		queryFn: () => getSettings(),
	});

	return {
		settings,
		isPending,
		isError,
		error,
	};
};

export default useSettings;
