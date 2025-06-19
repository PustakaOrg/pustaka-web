import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	postReservation,
	PostReservationPayload,
} from "../api/postReservation";
import { toast } from "sonner";

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
      toast.success("Reservasi berhasil ditambah!")
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
