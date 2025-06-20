import { api } from "~/shared/utils/api";

export const deleteClass = (id: string) => {
	return api.delete(`classes/${id}/`);
};
