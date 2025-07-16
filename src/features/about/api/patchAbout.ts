import { api } from "~/shared/utils/api";
import { About } from "~/types/entities/About";

export type PatchAboutPayload = {
	nama: string;
	nim: string;
};

export const patchAbout = (id: string, data: PatchAboutPayload) => {
	return api.patch<About>(`about/${id}/`, data);
};



