import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../api/getReservations";

const useReservationList = () => {
	const {
		data: reservationList,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ["reservations"],
		queryFn: getReservation,
	});
	return { reservationList, isPending, isError, error };
};

export default useReservationList;
