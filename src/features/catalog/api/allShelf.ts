import { api } from "~/shared/utils/api";
import { Shelf } from "~/types/entities/Shelf";

export const allShelf = () => {
	return api.get<Shelf[]>("shelves/all/");
};
