import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchSettings } from "../api/patchSettings";

const useUpdateSettings = () => {
	const queryClient = useQueryClient();
	const {
		data: newSettings,
		isPending,
		isError,
		error,
		mutate: updateSettings,
	} = useMutation({
		mutationKey: ["update-settings"],
		mutationFn: ({ data }: { data: FormData }) => patchSettings(data),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["settings"] });
		},
	});
	return { newSettings, isPending, isError, updateSettings };
};

export default useUpdateSettings;
