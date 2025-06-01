import { BaseListParams } from "~/types/BaseListParams";

export type ReservationListParams = Partial<{
	limit: number;
	offset: number;
}> & BaseListParams;
