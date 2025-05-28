import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	patchReservation,
	PatchReservationPayload,
} from "../api/patchReservation";

const useUpdateReservationStatus = () => {
	const queryClient = useQueryClient();
	const {
		data: updatedReservation,
		isPending,
		isError,
		error,
		mutate: updateReservation,
	} = useMutation({
		mutationKey: ["update-reservation"],
		mutationFn: ({
			reservationId: reservationId,
			payload,
		}: { reservationId: string; payload: PatchReservationPayload }) =>
			patchReservation(reservationId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reservations"] });
			queryClient.invalidateQueries({ queryKey: ["books"] });
			queryClient.invalidateQueries({ queryKey: ["search-books"] });
		},
		onSettled(data, error, variables, context) {
			queryClient.refetchQueries({ queryKey: ["resevations"] });
		},
	});

	return {
		updatedReservation,
		isPending,
		isError,
		error,
		updateReservation,
	};
};

export default useUpdateReservationStatus;
