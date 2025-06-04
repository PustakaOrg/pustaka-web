import { BaseListParams } from "~/types/BaseListParams";
import { ReservationStatus } from "~/types/entities/Reservation";

export type ReservationListParams = Partial<{
  status: ReservationStatus;
  q: string;
}> & BaseListParams;
