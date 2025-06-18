import { api } from "~/shared/utils/api";
import { ImportResponse } from "~/types/responses";

export const importBook = (form: FormData) => {
	return api.post<ImportResponse>("books/import/", form);
};
