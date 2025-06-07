import { api } from "~/shared/utils/api";
import { Publisher } from "~/types/entities/Publisher";

export type PatchPublisherPayload = {
	name: string;
	city: string;
};
export const patchPublisher = (id: string, payload: PatchPublisherPayload) => {
	return api.patch<Publisher>(`publishers/${id}/`, payload);
};
