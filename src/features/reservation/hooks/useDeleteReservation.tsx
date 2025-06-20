import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReservation as deleteReservationApi } from "../api/deleteReservation";
import { toast } from "sonner";

const useDeleteReservation = () => {
	const queryClient = useQueryClient();
	const {
		isPending,
		isError,
		error,
		mutate: deleteReservation,
	} = useMutation({
		mutationKey: ["delete-reservation"],
		mutationFn: (id: string) => deleteReservationApi(id),
		onSuccess: () => {},
		onSettled: () => {
			toast.success("Reservation deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["reservations"] });

		},
	});
	return {
		isPending,
		isError,
		error,
		deleteReservation,
	};
};

export default useDeleteReservation;
