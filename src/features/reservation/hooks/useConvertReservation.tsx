import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertReservation as convertReservationApi } from "../api/convertReservation";

const useConvertReservation = () => {
	const queryClient = useQueryClient();
	const {
		data: convertedReservation,
		isPending,
		isError,
		error,
		mutate: convertReservation,
	} = useMutation({
		mutationKey: ["convert-reservation"],
		mutationFn: ({ reservationId: reservationId }: { reservationId: string }) =>
			convertReservationApi(reservationId),
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
		convertedReservation,
		isPending,
		isError,
		error,
		convertReservation,
	};
};

export default useConvertReservation;
