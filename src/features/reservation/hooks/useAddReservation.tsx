import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	postReservation,
	PostReservationPayload,
} from "../api/postReservation";

const useAddReservation = () => {
	const queryClient = useQueryClient();
	const {
		data: newReservation,
		isPending,
		isError,
		error,
		mutate: addReservation,
	} = useMutation({
		mutationKey: ["add-reservation"],
		mutationFn: (data: PostReservationPayload) => postReservation(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
			queryClient.invalidateQueries({ queryKey: ["books"] });
		},
	});

	return {
		newReservation,
		isPending,
		isError,
		error,
		addReservation,
	};
};

export default useAddReservation;
