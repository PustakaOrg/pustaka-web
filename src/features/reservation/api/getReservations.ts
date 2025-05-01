import { api } from "~/shared/utils/api";
import { Reservation } from "~/types/entities/Reservation";
import { PaginatedResponse } from "~/types/responses";

export const getReservation = () => {
	return api.get<PaginatedResponse<Reservation>>("reservations/");
};
