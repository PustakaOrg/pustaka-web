import { api } from "~/shared/utils/api";
import { About } from "~/types/entities/About";

export const deleteAbout = (id: string) => {
	return api.delete<About>(`about/${id}/`);
};
