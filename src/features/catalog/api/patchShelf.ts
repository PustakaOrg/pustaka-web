import { api } from "~/shared/utils/api";
import { Shelf } from "~/types/entities/Shelf";

export type PatchShelfPayload = {
	code: string;
};
export const patchShelf = (id: string, payload: PatchShelfPayload) => {
	return api.patch<Shelf>(`shelves/${id}/`, payload);
};
