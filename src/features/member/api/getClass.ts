import { api } from "~/shared/utils/api";
import { Class } from "~/types/entities/Class";

export const getClass = (id: string) => {
	return api.get<Class>(`classes/${id}/`);
};
