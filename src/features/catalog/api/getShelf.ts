import { api } from "~/shared/utils/api";
import { Shelf } from "~/types/entities/Shelf";

export const getShelf = (id: string) => {
	return api.get<Shelf>(`shelves/${id}/`);
};
