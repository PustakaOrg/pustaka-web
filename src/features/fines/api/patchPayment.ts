import { api } from "~/shared/utils/api";
import { PaymentStatus } from "~/types/entities/Payment";

export type PatchPaymentPayload = {
	accepted_by: string;
	status: PaymentStatus;
};

export const patchPayment = (id: string, payload: PatchPaymentPayload) => {
	return api.patch(`payments/${id}/`, payload);
};
