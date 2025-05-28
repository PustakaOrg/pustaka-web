import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../api/getReservations";
import { ReservationListParams } from "../type/ReservationListParams";

const useReservationList = (params?: ReservationListParams) => {
	const {
		data: reservationList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["reservations", params],
		queryFn: () => getReservation(params),
	});
	return { reservationList, isPending, isError, error };
};

export default useReservationList;
