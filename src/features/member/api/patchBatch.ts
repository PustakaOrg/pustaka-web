import { api } from "~/shared/utils/api";
import { Batch } from "~/types/entities/Batch";

export type PatchBatchPayload = {
	name: string;
};

export const patchBatch = (id: string, payload: PatchBatchPayload) => {
	return api.patch<Batch>(`batches/${id}`, payload);
};
