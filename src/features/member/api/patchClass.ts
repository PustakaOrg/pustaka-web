import { api } from "~/shared/utils/api";
import { Class } from "~/types/entities/Class";

export type PatchClassPayload = {
	name: string;
};
export const patchClass = (id: string, payload: PatchClassPayload) => {
	return api.patch<Class>(`classes/${id}/`, payload);
};
