import { api } from "~/shared/utils/api";
import { Reservation } from "~/types/entities/Reservation";

export interface PostReservationPayload {
	reservation_date: string;
	pickup_date: string;
	reservant: string;
	day_to_loan: number;
	book: string;
}

export const postReservation = (payload: PostReservationPayload) => {
	return api.post<Reservation>("reservations/", payload);
};
