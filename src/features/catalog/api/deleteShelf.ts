import { api } from "~/shared/utils/api";
import { Shelf } from "~/types/entities/Shelf";

export const deleteShelf = (id: string, ) => {
	return api.delete<Shelf>(`shelves/${id}/`);
};
