import { api } from "~/shared/utils/api";
import { Publisher } from "~/types/entities/Publisher";

export const deletPublisher = (id: string, ) => {
	return api.delete<Publisher>(`publishers/${id}/`);
};
