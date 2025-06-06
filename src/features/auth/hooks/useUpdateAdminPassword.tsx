import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { patchAdmin } from "../api/patchAdmin";

const useUpdateAdminPassword = () => {
	const queryClient = useQueryClient();
	const {
		data,
		isPending,
		isError,
		error,
		mutate: updateAdmin,
	} = useMutation({
		mutationKey: ["update-admin"],
		mutationFn: ({ id, password }: { id: string; password: string }) =>
			patchAdmin(id, password),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["profile"] });
		},
	});
	return {
		data,
		isPending,
		isError,
		error,
		updateAdmin,
	};
};

export default useUpdateAdminPassword;
