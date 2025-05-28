import { api } from "~/shared/utils/api";
import { Reservation } from "~/types/entities/Reservation";
import { PaginatedResponse } from "~/types/responses";
import { ReservationListParams } from "../type/ReservationListParams";

export const getReservation = (params?: ReservationListParams) => {
	return api.get<PaginatedResponse<Reservation>>("reservations/", {
		params: params as Record<string, string>,
	});
};
