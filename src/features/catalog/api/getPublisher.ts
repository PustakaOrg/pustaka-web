import { api } from "~/shared/utils/api";
import { Publisher } from "~/types/entities/Publisher";

export const getPublisher = (id: string) => {
	return api.get<Publisher>(`publishers/${id}/`);
};
