import { api } from "~/shared/utils/api";
import { Reservation } from "~/types/entities/Reservation";

export const convertReservation = (id: string) => {
	return api.post<Reservation>(`reservations/${id}/convert-to-loan/`, {});
};
