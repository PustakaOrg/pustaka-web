import { api } from "~/shared/utils/api";
import { Reservation, ReservationStatus } from "~/types/entities/Reservation";

export interface PatchReservationPayload {
	status: ReservationStatus;
  accepted_by: string | null
}

export const patchReservation = (
	reservationId: string,
	payload: PatchReservationPayload,
) => {
	return api.patch<Reservation>(`reservations/${reservationId}/`, payload);
};
