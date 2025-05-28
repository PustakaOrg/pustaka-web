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
			loanId: reservationId,
			payload,
		}: { loanId: string; payload: PatchReservationPayload }) =>
			patchReservation(reservationId, payload),
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ["resevations"] });
			queryClient.invalidateQueries({ queryKey: ["loans"] });
			queryClient.invalidateQueries({ queryKey: ["books"] });
			queryClient.invalidateQueries({ queryKey: ["search-books"] });
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
